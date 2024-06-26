import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteList, shareList } from '../api/firebase.js';
import { ListHeader } from '../components/ListHeader.jsx';
import { auth } from '../api/config.js';

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
			{!auth.currentUser ? (
				<div className="border border-dark-green py-8 px-12 mx-8 md:mx-24 text-off-black text-center tiny:mt-18 xs:mt-32 sm:mt-40 items-center justify-center bg-sage/75 rounded-2xl font-medium">
					Sign in to manage lists.
				</div>
			) : (
				<>
					{listPath ? (
						<>
							<ListHeader text={listName} />
							<section className="mx-8 md:mx-24">
								<form onSubmit={handleShareSubmit} className="w-full">
									<div>
										<label
											htmlFor="shareEmail"
											className="text-4xl text-off-black"
										>
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
											className="bg-white border-solid border-2 rounded-xl border-sage pl-2 min-h-14 md:w-8/12 grow mt-4 text-xl xs:text-2xl text-off-black"
										></input>
										<button
											type="submit"
											className="bg-sage p-2 px-4 rounded-xl text-3xl min-h-14 mt-4 grow xs:grow-0 text-off-black"
										>
											Send invite!
										</button>
									</div>
								</form>
							</section>
							<section className="mx-8 md:mx-24 mt-24">
								<h3 className="text-4xl text-off-black">List Options</h3>
								<button
									onClick={handleDelete}
									className="mt-4 bg-red-400/80 min-h-14 px-24 rounded-xl text-3xl w-full text-off-black"
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
									className="border border-dark-green rounded-xl px-4 py-2 hover:bg-pale-green text-off-black"
								>
									Select a list
								</button>
							</div>
						</>
					) : null}
				</>
			)}
		</>
	);
}
