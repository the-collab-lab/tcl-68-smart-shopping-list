import { useState } from 'react';
import { addItem } from '../api';
import { shareList } from '../api/firebase.js';

export function ManageList({ listPath, userId }) {
	const initialItemFormState = {
		itemName: '',
		daysUntilNextPurchase: 0,
	};
	const [newItem, setNewItem] = useState(initialItemFormState);
	const [shareEmail, setShareEmail] = useState('');

	const handleItemChange = ({ target }) => {
		setNewItem({ ...newItem, [target.name]: target.value });
	};
	const handleShareChange = ({ target }) => {
		setShareEmail(target.value);
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

	const handleShareSubmit = async (event) => {
		event.preventDefault();
		// shareList(listPath, currentUserId, recipientEmail)
		try {
			//if the user hasn't clicked on a list (state == null)
			if (!listPath) {
				alert('Please select a list to share.');
				return;
			}

			//Future validation: Check for existence of the list already in recipient's collection.

			const response = await shareList(listPath, userId, shareEmail);
			if (response) {
				alert('List was shared successfully.');
			} else {
				alert('List could not be shared.');
			}
		} catch (err) {
			alert(err);
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
				<form onSubmit={handleShareSubmit}>
					<label htmlFor="shareEmail">
						Share with:
						<input
							id="shareEmail"
							name="shareEmail"
							type="email"
							value={shareEmail}
							onChange={handleShareChange}
						></input>
					</label>
					<button type="submit">Send invite!</button>
				</form>
			</section>
		</>
	);
}
