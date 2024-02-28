import './ListItem.css';
import { updateItem } from '../api/firebase.js';
import { useState, useEffect } from 'react';

export function ListItem({ listPath, item }) {
	const [isPurchased, setIsPurchased] = useState(false);

	function changeHandler(e) {
		console.log('Is purchased before flipping ' + isPurchased);
		setIsPurchased(!isPurchased);
	}

	useEffect(() => {
		async function purchaseItem() {
			if (isPurchased) {
				console.log(isPurchased + ' is purchased!');
				try {
					await updateItem(listPath, item.id);
				} catch (error) {
					alert(error.message);
				}
			}
		}
		purchaseItem();
	}, [isPurchased, item.id, listPath]);

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
				/>
			</label>
		</li>
	);
}
