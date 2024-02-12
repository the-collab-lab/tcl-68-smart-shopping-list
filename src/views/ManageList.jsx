import { useState } from 'react';
import { addItem } from '../api';

export function ManageList({ listPath }) {
	const initialFormState = {
		itemName: '',
		daysUntilNextPurchase: 0,
	};
	const [newItem, setNewItem] = useState(initialFormState);

	const handleChange = ({ target }) => {
		setNewItem({ ...newItem, [target.name]: target.value });
	};

	const handleSubmit = async (event) => {
		newItem.daysUntilNextPurchase = Number(newItem.daysUntilNextPurchase);
		event.preventDefault();
		try {
			await addItem(listPath, newItem);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<section>
				<form onSubmit={handleSubmit}>
					<label htmlFor="itemName">
						Item Name
						<input
							id="itemName"
							name="itemName"
							type="text"
							value={newItem.itemName}
							onChange={handleChange}
						></input>
					</label>
					<label htmlFor="daysUntilNextPurchase">
						Next Purchase
						<select
							id="daysUntilNextPurchase"
							name="daysUntilNextPurchase"
							value={newItem.daysUntilNextPurchase}
							onChange={handleChange}
						>
							<option value={0}>Select Next Purchase Date</option>
							<option value={7}>One Week</option>
							<option value={14}>Two Weeks</option>
							<option value={30}>One Month</option>
						</select>
					</label>
					<button type="submit">Add Item</button>
				</form>
			</section>
		</>
	);
}
