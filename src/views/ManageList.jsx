import { useState } from 'react';
import { addItem } from '../api';

export function ManageList({ listPath }) {
	const initialFormState = {
		itemName: '',
		daysUntilNextPurchase: 0,
	};
	const [newItem, setNewItem] = useState(initialFormState);

	const handleItemChange = ({ target }) => {
		setNewItem({ ...newItem, [target.name]: target.value });
	};

	const handleItemSubmit = async (event) => {
		newItem.daysUntilNextPurchase = Number(newItem.daysUntilNextPurchase);
		event.preventDefault();
		try {
			await addItem(listPath, newItem);
			alert('Item successfully added!');
		} catch (error) {
			console.log(error);
			alert('Unable to add item');
		}
	};

	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<section>
				<form onSubmit={handleItemSubmit}>
					<label htmlFor="itemName">
						Item Name
						<input
							id="itemName"
							name="itemName"
							type="text"
							value={newItem.itemName}
							onChange={handleItemChange}
						></input>
					</label>
					<label htmlFor="daysUntilNextPurchase">
						Next Purchase
						<select
							id="daysUntilNextPurchase"
							name="daysUntilNextPurchase"
							value={newItem.daysUntilNextPurchase}
							onChange={handleItemChange}
						>
							<option value={0}>Select Next Purchase Date</option>
							<option value={7}>Soon</option>
							<option value={14}>Kind of soon</option>
							<option value={30}>Not soon</option>
						</select>
					</label>
					<button type="submit">Add Item</button>
				</form>
			</section>
			<section>
				<form></form>
			</section>
		</>
	);
}
