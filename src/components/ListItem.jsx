import './ListItem.css';
import { updateItem } from '../api/firebase.js';
import { useState, useEffect } from 'react';
import { ONE_DAY_IN_MILLISECONDS } from '../utils/dates.js';

export function ListItem({ listPath, item }) {
	const [isPurchased, setIsPurchased] = useState(false);

	function changeHandler(e) {
		setIsPurchased(!isPurchased);
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
			if (
				item.dateLastPurchased &&
				Date.now() -
					(item.dateLastPurchased.seconds * 1000 >= ONE_DAY_IN_MILLISECONDS)
			) {
				setIsPurchased(false);
			}
		}, ONE_DAY_IN_MILLISECONDS);
		return () => clearTimeout(timer);
	}, [item.dateLastPurchased, isPurchased]);

	//potential future issue: feature that allows user to uncheck mistakenly checked items without updating database

	return (
		<li className="ListItem">
			<label htmlFor={item.name}>
				{item.name}
				<input
					type="checkbox"
					id={item.name}
					name="purchased"
					value={isPurchased}
					onChange={changeHandler}
					checked={isPurchased}
				/>
			</label>
		</li>
	);
}
