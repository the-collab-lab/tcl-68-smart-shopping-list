import './ListItem.css';
import { updateItem, deleteItem } from '../api/firebase.js';
import { useState, useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates.js';
import { purchaseUrgency } from '../utils/hooks.js';

export function ListItem({ listPath, item }) {
	//Time variables for each item on render
	const lastPurchase =
		item.dateLastPurchased[item.dateLastPurchased.length - 1];
	const timeElapsed = Date.now() - lastPurchase.seconds * 1000;

	//Boolean to pass into isChecked state
	const purchasedWithinDay = () => {
		//Exclude new, never purchased items - new items are added to db with same dateCreated + first dateLastPurchased
		if (item.dateCreated.seconds === lastPurchase.seconds) {
			return false;
		} else {
			return timeElapsed <= ONE_DAY_IN_MILLISECONDS;
		}
	};

	//Box is checked on render if purchased within 24 hrs
	const [isChecked, setIsChecked] = useState(purchasedWithinDay);

	//If item is checked on render, calculate time until isChecked state is set to false/unchecked
	useEffect(() => {
		if (isChecked) {
			const timeRemaining = ONE_DAY_IN_MILLISECONDS - timeElapsed;
			const timer = setTimeout(() => {
				setIsChecked(false);
			}, timeRemaining);
			return () => clearTimeout(timer);
		}
	}, [isChecked, timeElapsed]);

	const changeHandler = (e) => {
		async function purchaseItem() {
			try {
				await updateItem(listPath, item.id, !isChecked);
				setIsChecked(!isChecked);
			} catch (error) {
				alert(error.message);
			}
		}
		purchaseItem();
	};

	const deleteHandler = async (e) => {
		if (window.confirm(`Are you sure you'd like to delete ${item.name}?`)) {
			await deleteItem(listPath, item.id);
		}
	};

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
