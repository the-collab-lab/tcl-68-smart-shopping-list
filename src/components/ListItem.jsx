import './ListItem.css';
import { updateItem, deleteItem } from '../api/firebase.js';
import { useState, useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates.js';
import { purchaseUrgency } from '../utils/hooks.js';

export function ListItem({ listPath, item }) {
	//Box is checked on render if purchased within 24 hrs
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		//Time variables for each item
		const lastPurchase =
			item.dateLastPurchased[item.dateLastPurchased.length - 1];
		const timeElapsed = Date.now() - lastPurchase.seconds * 1000;

		//New, never purchased items created in db with same dateCreated and dateLastPurchased
		const hasBeenPurchased = item.dateCreated.seconds !== lastPurchase.seconds;
		const lessThanOneDay = timeElapsed <= ONE_DAY_IN_MILLISECONDS;
		const isChecked = hasBeenPurchased && lessThanOneDay;
		setIsChecked(isChecked);

		if (isChecked) {
			//If item is checked on render, calculate time until isChecked state is set to false/unchecked
			const timeRemaining = ONE_DAY_IN_MILLISECONDS - timeElapsed;
			const timer = setTimeout(() => {
				setIsChecked(false);
			}, timeRemaining);
			return () => clearTimeout(timer);
		}
	}, [item.dateLastPurchased, item.dateCreated]);

	const changeHandler = async () => {
		try {
			await updateItem(listPath, item.id, !isChecked);
			setIsChecked(!isChecked);
		} catch (error) {
			alert(error.message);
		}
	};

	const deleteHandler = async () => {
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
