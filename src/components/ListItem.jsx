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
	function changeHandler(e) {
		setIsChecked(!isChecked);
		async function purchaseItem() {
			try {
				await updateItem(listPath, item.id, !isChecked);
			} catch (error) {
				alert(error.message);
			}
		}
		purchaseItem();
	}

	//sets a timer to uncheck an item 24 hours after it's purchased
	useEffect(() => {
		const timer = setTimeout(() => {
			if (purchasedOneDayAgo) {
				setIsChecked(false);
			}
		}, ONE_DAY_IN_MILLISECONDS);
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
