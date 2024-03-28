import { useState } from 'react';
import { shareList, deleteList } from '../api/firebase.js';
import { useNavigate } from 'react-router-dom';

export function ManageList({ setListPath, listPath, userEmail, userId }) {
	const navigate = useNavigate();
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
		if (!listPath) {
			alert('Please select a list before continuing.');
			return;
		}
		if (
			window.confirm(
				`Would you like to delete ${listName}? This action cannot be undone.`,
			)
		) {
			// delete list and use the result to inform user:
			const deleteConfirmation = await deleteList(userEmail, listPath, userId);
			if (deleteConfirmation) {
				alert(`${listName} has been deleted successfully!`);
				// if successful, reset selection, remove just-deleted list from localStorage, redirect to Home:
				setListPath(null);
				navigate('/');
			} else {
				alert('An error has occurred.');
			}
		}
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
