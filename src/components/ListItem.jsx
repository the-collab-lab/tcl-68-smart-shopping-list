import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api/firebase.js';

export function ListItem({ item }) {
	// const formData = {
	// 	dateLastPurchased: item.dateLastPurchased,
	// 	totalPurchases: item.totalPurchases,
	// 	purchased: false,
	// };
	const [isPurchased, setIsPurchased] = useState(false);
	// const [updatedItem, setUpdatedItem] = useState(formData);

	function changeHandler(e) {
		setIsPurchased(!isPurchased);
	}

	async function purchaseItem() {
		let today = new Date();
		if (isPurchased) {
			try {
				await updateItem(today, item.totalPurchases);
			} catch (error) {
				console.log(error);
			}
		}
	}

	//const [isPurchased, setIsPurchased] = useState(false);
	//const toggleIsPurchased = () => setIsPurchased(!isPurchased)
	//potential future issue: feature that allows user to uncheck mistakenly checked items without updating database
	//await updateItem(listPath, {updatedItem.dateLastPurchased, updatedItem.totalPurchases})

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
