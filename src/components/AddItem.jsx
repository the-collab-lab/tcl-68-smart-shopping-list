import { useState } from 'react';
import { addItem } from '../api';

export function AddItem({ data, listPath }) {
	const initialItemFormState = {
		itemName: '',
		daysUntilNextPurchase: 0,
	};
	const [newItem, setNewItem] = useState(initialItemFormState);

	const currentList = data.map((item) => {
		return item.name
			.toLowerCase()
			.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~/\s]/g, '');
	});

	const handleItemChange = ({ target }) => {
		setNewItem({ ...newItem, [target.name]: target.value });
	};

	const handleItemSubmit = async (event) => {
		newItem.daysUntilNextPurchase = Number(newItem.daysUntilNextPurchase);
		event.preventDefault();

		if (!newItem.itemName) {
			alert('Please enter an item name');
			return;
		}

		//edge case: what if someone decides to put only puncutation as item name
		const itemName = newItem.itemName
			.toLowerCase()
			.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~/\s]/g, '');

		if (currentList.includes(itemName)) {
			alert('This item already exists in the list.');
			return;
		}

		//Compare new item name to current list in database
		try {
			await addItem(listPath, newItem);
			setNewItem(initialItemFormState);
			alert('Item successfully added!');
		} catch (error) {
			alert('Unable to add item');
		}
	};

	return (
		<section>
			<form onSubmit={handleItemSubmit}>
				<label htmlFor="itemName">Item Name</label>
				<input
					id="itemName"
					name="itemName"
					type="text"
					value={newItem.itemName}
					onChange={handleItemChange}
				></input>
				<label htmlFor="daysUntilNextPurchase">Next Purchase</label>
				<select
					id="daysUntilNextPurchase"
					name="daysUntilNextPurchase"
					value={newItem.daysUntilNextPurchase}
					onChange={handleItemChange}
					required
				>
					<option value="">Select Next Purchase Date</option>
					<option value={7}>Soon</option>
					<option value={14}>Kind of soon</option>
					<option value={30}>Not soon</option>
				</select>
				<button type="submit">Add Item</button>
			</form>
		</section>
	);
}
