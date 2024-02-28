import './ListItem.css';
import { updateItem } from '../api/firebase.js';

export function ListItem({ item }) {
	let isPurchased = false;

	function changeHandler(e) {
		isPurchased = !isPurchased;
		purchaseItem();
	}

	async function purchaseItem() {
		console.log(isPurchased);
		let today = new Date();
		if (isPurchased) {
			try {
				await updateItem(today, item.totalPurchases);
			} catch (error) {
				console.log(error);
			}
		}
	}

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
