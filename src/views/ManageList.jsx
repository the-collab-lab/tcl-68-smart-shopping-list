import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteList, shareList } from '../api/firebase.js';
import { ListHeader } from '../components/ListHeader.jsx';

export function ManageList({ setListPath, listPath, userEmail, userId }) {
	const navigate = useNavigate();

	const listName = listPath?.split('/')[1];
	const [shareEmail, setShareEmail] = useState('');

	const handleClick = (selectedPath) => {
		navigate(selectedPath);
	};

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
			{listPath ? (
				<>
					<ListHeader text={listName} />
					<section className="mx-8 md:mx-24">
						<form onSubmit={handleShareSubmit} className="w-full">
							<div>
								<label htmlFor="shareEmail" className="text-4xl">
									Share List
								</label>
							</div>
							<div className="flex flex-wrap xs:flex-nowrap gap-x-6">
								<input
									id="shareEmail"
									name="shareEmail"
									type="email"
									value={shareEmail}
									placeholder="Enter Recipient Email"
									onChange={handleShareChange}
									className="bg-pale-green border-solid border-2 rounded-xl border-sage pl-2 min-h-14 md:w-8/12 grow mt-4 text-xl xs:text-2xl"
								></input>
								<button
									type="submit"
									className="bg-sage p-2 px-4 rounded-xl text-3xl min-h-14 mt-4 grow xs:grow-0"
								>
									Send invite!
								</button>
							</div>
						</form>
					</section>
					<section className="mx-8 md:mx-24 mt-24">
						<h3 className="text-4xl">List Options</h3>
						<button
							onClick={handleDelete}
							className="mt-4 bg-red-400/80 min-h-14 px-24 rounded-xl text-3xl w-full"
						>
							Delete List
						</button>
					</section>
				</>
			) : null}
			{!listPath ? (
				<>
					<ListHeader text="You haven't selected a list yet. Click below to select a list." />
					<div className="flex justify-center">
						<button
							onClick={() => handleClick('/')}
							className="border border-dark-green rounded-2xl px-4 py-2 hover:bg-pale-green"
						>
							Select a list
						</button>
					</div>
				</>
			) : null}
		</>
	);
}
