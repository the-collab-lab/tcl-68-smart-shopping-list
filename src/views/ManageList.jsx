import { useState } from 'react';
import { shareList, deleteList } from '../api/firebase.js';

export function ManageList({ listPath, userEmail, userId }) {
	const listName = listPath?.split('/')[1];
	const [shareEmail, setShareEmail] = useState('');

	const handleShareChange = ({ target }) => {
		setShareEmail(target.value);
	};

	const handleShareSubmit = async (event) => {
		event.preventDefault();
		try {
			//if the user hasn't clicked on a list (state == null)
			if (!listPath) {
				throw new Error('Please select a list to share.');
			}

			//Future validation: Check for existence of the list already in recipient's collection.

			await shareList(listPath, userId, shareEmail);
			alert('You shared successfully.');
		} catch (err) {
			alert(err.message);
		}
	};

	const handleDelete = async () => {
		deleteList(userEmail, listPath, listName);
	};

	return (
		<>
			<h2>{listName}</h2>
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
				<button onClick={() => handleDelete()}>DELETE this list!</button>
			</section>
		</>
	);
}
