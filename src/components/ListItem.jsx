import './ListItem.css';
import { updateItem } from '../api/firebase.js';
import { useState, useEffect, useCallback } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates.js';

export function ListItem({ listPath, item }) {
	const purchasedOneDayAgo = useCallback(() => {
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

	const [isPurchased, setIsPurchased] = useState(false);
	const [isChecked, setIsChecked] = useState(purchasedOneDayAgo);
	function changeHandler(e) {
		setIsPurchased(!isPurchased);
		setIsChecked(!isChecked);
	}

	useEffect(() => {
		async function purchaseItem() {
			if (isPurchased) {
				try {
					await updateItem(listPath, item.id);
				} catch (error) {
					alert(error.message);
				}
			}
		}
		purchaseItem();
	}, [isPurchased, item.id, listPath]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (purchasedOneDayAgo) {
				console.log(item.name);
				setIsChecked(false);
			}
		}, 10000);
		return () => clearTimeout(timer);
	}, [isChecked, purchasedOneDayAgo]);

	//potential future issue: feature that allows user to uncheck mistakenly checked items without updating database

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
