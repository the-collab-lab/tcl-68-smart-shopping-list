import {
	addDoc,
	arrayUnion,
	getDoc,
	setDoc,
	collection,
	doc,
	onSnapshot,
	updateDoc,
	increment,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';
import { getFutureDate, getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
// calculateEstimate takes 3 arguments - previousEstimate (number), daysSinceLastPurchase (number), totalPurchases (number)

/**
 * A custom hook that subscribes to the user's shopping lists in our Firestore
 * database and returns new data whenever the lists change.
 * @param {string | null} userId
 * @param {string | null} userEmail
 * @returns
 */
export function useShoppingLists(userId, userEmail) {
	// Start with an empty array for our data.
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		// If we don't have a userId or userEmail (the user isn't signed in),
		// we can't get the user's lists.
		if (!userId || !userEmail) return;

		// When we get a userEmail, we use it to subscribe to real-time updates
		const userDocRef = doc(db, 'users', userEmail);
		onSnapshot(userDocRef, (docSnap) => {
			if (docSnap.exists()) {
				const listRefs = docSnap.data().sharedLists;
				const newData = listRefs.map((listRef) => {
					// We keep the list's id and path so we can use them later.
					return { name: listRef.id, path: listRef.path };
				});
				setData(newData);
			}
		});
	}, [userId, userEmail]);

	return data;
}

/**
 * A custom hook that subscribes to a shopping list in our Firestore database
 * and returns new data whenever the list changes.
 * @param {string | null} listPath
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function useShoppingListData(listPath) {
	// Start with an empty array for our data.
	/** @type {import('firebase/firestore').DocumentData[]} */
	const initialState = [];
	const [data, setData] = useState(initialState);

	useEffect(() => {
		if (!listPath) return;

		// When we get a listPath, we use it to subscribe to real-time updates
		// from Firestore.
		return onSnapshot(collection(db, listPath, 'items'), (snapshot) => {
			// The snapshot is a real-time update. We iterate over the documents in it
			// to get the data.
			const nextData = snapshot.docs.map((docSnapshot) => {
				// Extract the document's data from the snapshot.
				const item = docSnapshot.data();

				// The document's id is not in the data,
				// but it is very useful, so we add it to the data ourselves.
				item.id = docSnapshot.id;

				return item;
			});

			// Update our React state with the new data.
			setData(nextData);
		});
	}, [listPath]);

	// Return the data so it can be used by our React components.
	return data;
}

/**
 * Add a new user to the users collection in Firestore.
 * @param {Object} user The user object from Firebase Auth.
 */
export async function addUserToDatabase(user) {
	// Check if the user already exists in the database.
	const userDoc = await getDoc(doc(db, 'users', user.email));
	// If the user already exists, we don't need to do anything.
	if (userDoc.exists()) {
		return;
	} else {
		// If the user doesn't exist, add them to the database.
		// We'll use the user's email as the document id
		// because it's more likely that the user will know their email
		// than their uid.
		await setDoc(doc(db, 'users', user.email), {
			email: user.email,
			name: user.displayName,
			uid: user.uid,
			sharedLists: [],
		});
	}
}

/**
 * Create a new list and add it to a user's lists in Firestore.
 * @param {string} userId The id of the user who owns the list.
 * @param {string} userEmail The email of the user who owns the list.
 * @param {string} listName The name of the new list.
 */
export async function createList(userId, userEmail, listName) {
	try {
		const listDocRef = doc(db, userId, listName);

		await setDoc(listDocRef, {
			owner: userId,
		});

		const userDocumentRef = doc(db, 'users', userEmail);

		updateDoc(userDocumentRef, {
			sharedLists: arrayUnion(listDocRef),
		});

		return true;
	} catch (error) {
		return false;
	}
}

/**
 * Shares a list with another user.
 * @param {string} listPath The path to the list to share.
 * @param {string} recipientEmail The email of the user to share the list with.
 */
export async function shareList(listPath, currentUserId, recipientEmail) {
	// Check if current user is owner.
	if (!listPath.includes(currentUserId)) {
		throw new Error('The list is not yours to share.');
	}

	// Get the document for the recipient user.
	const usersCollectionRef = collection(db, 'users');
	const recipientDoc = await getDoc(doc(usersCollectionRef, recipientEmail));
	// If the recipient user doesn't exist, we can't share the list.

	if (!recipientDoc.exists()) {
		throw new Error('User does not yet exist.');
	}

	// Add the list to the recipient user's sharedLists array.
	const listDocumentRef = doc(db, listPath);
	const userDocumentRef = doc(db, 'users', recipientEmail);

	updateDoc(userDocumentRef, {
		sharedLists: arrayUnion(listDocumentRef),
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listPath The path of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listPath, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listPath, 'items');
	const newItem = await addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: [new Date()],
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
	return newItem;
}

//Helper function to handle estimation logic
async function handleCalculateEstimate(listRef) {
	const selectedItem = await getDoc(listRef);

	//access array of dateLastPurchased for the selected item
	const selectedLastPurchase = selectedItem.data().dateLastPurchased;

	//retrieve the most recent purchase date from the array and convert to a date
	const lastPurchased =
		selectedLastPurchase[selectedLastPurchase.length - 1].toDate();

	//calculates the previously estimated days until next purchase
	const previousEstimate = getDaysBetweenDates(
		lastPurchased,
		selectedItem.data().dateNextPurchased.toDate(),
	);
	const daysSincePrevPurchase = getDaysBetweenDates(lastPurchased, new Date());

	//calculates a new estimate based on the previous estimate, days since last purchased, and total purchases
	const newEstimate = calculateEstimate(
		previousEstimate,
		daysSincePrevPurchase,
		selectedItem.data().totalPurchases,
	);

	return { newEstimate, selectedLastPurchase };
}

export async function updateItem(listPath, itemID, isChecked) {
	const listRef = doc(db, listPath, 'items', itemID);

	const { newEstimate, selectedLastPurchase } =
		await handleCalculateEstimate(listRef);

	//checks to see if checkbox is checked in front end, updates selected item
	if (isChecked) {
		await updateDoc(listRef, {
			dateLastPurchased: [...selectedLastPurchase, new Date()],
			dateNextPurchased: getFutureDate(newEstimate),
			totalPurchases: increment(1),
		});
	} else {
		selectedLastPurchase.pop();
		await updateDoc(listRef, {
			dateLastPurchased: [...selectedLastPurchase],
			totalPurchases: increment(-1),
		});
	}
}

export async function deleteItem() {
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export function comparePurchaseUrgency(a, b) {
	const today = new Date();
	const nextPurchaseDaysBetween = Number(
		getDaysBetweenDates(today, a.dateNextPurchased.toDate()),
	);
	const lastPurchaseDaysBetween = getDaysBetweenDates(
		a.dateLastPurchased[a.dateLastPurchased.length - 1].toDate(),
		today,
	);
	const nextPurchaseDaysBetweenB = Number(
		getDaysBetweenDates(today, b.dateNextPurchased.toDate()),
	);
	const lastPurchaseDaysBetweenB = getDaysBetweenDates(
		b.dateLastPurchased[b.dateLastPurchased.length - 1].toDate(),
		today,
	);
	if (lastPurchaseDaysBetween > 60 && lastPurchaseDaysBetweenB < 60) {
		return 1;
	}
	if (lastPurchaseDaysBetween < 60 && lastPurchaseDaysBetweenB > 60) {
		return -1;
	}
	if (nextPurchaseDaysBetween < nextPurchaseDaysBetweenB) {
		return -1;
	}
	if (nextPurchaseDaysBetween === nextPurchaseDaysBetweenB) {
		if (a.name < b.name) {
			return -1;
		} else if (a.name === b.name) {
			return 0;
		} else {
			return 1;
		}
	}
	if (nextPurchaseDaysBetween > nextPurchaseDaysBetweenB) {
		return 1;
	}
}
