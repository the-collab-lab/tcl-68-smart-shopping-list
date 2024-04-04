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
		<section className="mt-8 mb-8">
			<form
				onSubmit={handleItemSubmit}
				className="grid grid-cols-addItem grid-rows-2 items-center"
			>
				<label htmlFor="itemName" className="col-span-1">
					New Item:
				</label>
				<input
					id="itemName"
					name="itemName"
					type="text"
					value={newItem.itemName}
					onChange={handleItemChange}
					className="border-solid border-2 rounded-xl border-sage pl-2 min-h-14 mx-4 grow mt-2 text-2xl col-span-1"
				></input>
				<label htmlFor="daysUntilNextPurchase" className="col-span-1">
					Urgency:
				</label>
				<select
					id="daysUntilNextPurchase"
					name="daysUntilNextPurchase"
					value={newItem.daysUntilNextPurchase}
					onChange={handleItemChange}
					required
					className="border-solid border-2 rounded-xl border-sage pl-2 min-h-14 mx-4 grow mt-2 text-2xl"
				>
					<option value="">Select Urgency</option>
					<option value={7}>Soon</option>
					<option value={14}>Kind of soon</option>
					<option value={30}>Not soon</option>
				</select>
				<button
					type="submit"
					className="bg-sage p-2 px-4 rounded-xl text-3xl min-h-14 mt-4 col-span-2 md:m-w-2xl justify-self-center"
				>
					Add Item
				</button>
			</form>
		</section>
	);
}
