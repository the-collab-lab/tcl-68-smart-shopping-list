import { useState } from 'react';

export function ManageList() {
	const initialFormState = {
		itemName: '',
		nextPurchase: '',
	};
	const [newItem, setNewItem] = useState(initialFormState);

	const handleChange = ({ target }) => {
		setNewItem({ ...newItem, [target.name]: target.value });
	};
	console.log(newItem);
	return (
		<>
			<p>
				Hello from the <code>/manage-list</code> page!
			</p>
			<section>
				<form>
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
					<label htmlFor="nextPurchase">
						Next Purchase
						<select
							id="nextPurchase"
							name="nextPurchase"
							value={newItem.nextPurchase}
							onChange={handleChange}
						>
							<option value="">Select Next Purchase Date</option>
							<option value="7">One Week</option>
							<option value="14">Two Weeks</option>
							<option value="30">One Month</option>
						</select>
					</label>
					<button type="submit">Add Item</button>
				</form>
			</section>
		</>
	);
}
