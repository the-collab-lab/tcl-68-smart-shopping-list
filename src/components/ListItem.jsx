import './ListItem.css';
import { updateItem } from '../api/firebase.js';
import { useState, useEffect, useMemo } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates.js';

export function ListItem({ listPath, item }) {
	/* Returns a boolean that is passed into isChecked useState
	On render, box is checked if purchased less than a day ago */

	const purchasedOneDayAgo = useMemo(() => {
		if (item.dateLastPurchased !== null) {
			const timeDiff = Date.now() - item.dateLastPurchased.seconds * 1000;
			if (timeDiff <= ONE_DAY_IN_MILLISECONDS) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
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
		let timeRemaining = updateTimer();

		const timer = setTimeout(() => {
			if (timeRemaining > 0) {
				setIsChecked(false);
			}
		}, timeRemaining);
		return () => clearTimeout(timer);
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
		</li>
	);
}
