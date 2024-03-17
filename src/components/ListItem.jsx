import './ListItem.css';
import { updateItem, deleteItem } from '../api/firebase.js';
import { useState, useEffect, useMemo } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates.js';
import { purchaseUrgency } from '../utils/hooks.js';

export function ListItem({ listPath, item }) {
	/* Returns a boolean that is passed into isChecked useState
	On render, box is checked if purchased less than a day ago */

	const purchasedOneDayAgo = useMemo(() => {
		if (item.dateLastPurchased === null) {
			return false;
		}

		const timeDiff = Date.now() - item.dateLastPurchased.seconds * 1000;
		return timeDiff <= ONE_DAY_IN_MILLISECONDS;
	}, [item.dateLastPurchased]);

	const [isChecked, setIsChecked] = useState(purchasedOneDayAgo);
	const changeHandler = (e) => {
		setIsChecked(!isChecked);
		async function purchaseItem() {
			try {
				await updateItem(listPath, item.id, !isChecked);
			} catch (error) {
				alert(error.message);
			}
		}
		purchaseItem();
	};

	const deleteHandler = async (e) => {
		// Note: Should we add more user feedback when items are successfully deleted? Some might further interrupt usability.
		if (window.confirm(`Are you sure you'd like to delete ${item.name}?`)) {
			await deleteItem(listPath, item.id);
		}
	};

	//Calculate time remaining if purchase was less than 24 hours ago
	const updateTimer = () => {
		if (item.dateLastPurchased) {
			const timeElapsed = Date.now() - item.dateLastPurchased.seconds * 1000;
			if (timeElapsed < ONE_DAY_IN_MILLISECONDS) {
				return ONE_DAY_IN_MILLISECONDS - timeElapsed;
			} else {
				return 0;
			}
		}
	};

	//sets a timer to uncheck an item 24 hours after it's purchased
	useEffect(() => {
		if (purchasedOneDayAgo) {
			let timeRemaining = updateTimer();

			const timer = setTimeout(() => {
				setIsChecked(false);
			}, timeRemaining);
			return () => clearTimeout(timer);
		}
	}, [isChecked, purchasedOneDayAgo]);

	return (
		<li className="ListItem">
			<label htmlFor={item.name}>
				{item.name}
				<input
					type="checkbox"
					id={item.name}
					name="purchased"
					onChange={changeHandler}
					checked={isChecked}
				/>
			</label>
			<div>
				{purchaseUrgency(
					item.dateNextPurchased,
					item.dateLastPurchased[item.dateLastPurchased.length - 1],
				)}
			</div>
			<button type="button" onClick={deleteHandler}>
				Delete
			</button>
		</li>
	);
}
