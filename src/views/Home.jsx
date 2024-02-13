import './Home.css';
import { SingleList } from '../components/SingleList.jsx';
import { useState } from 'react';
import { createList } from '../api/firebase.js';
import { useEffect, useCallback } from 'react';

export function Home({ data, userId, userEmail, setListPath }) {
	const [newListName, setNewListName] = useState('');
	const [newListSuccess, setNewListSuccess] = useState(null);
	const [showMessage, setShowMessage] = useState(false);

	const findNewList = (docRef) =>
		docRef ? docRef._key.path.segments[1] === newListName : false;

	const handleChange = (e) => {
		setNewListName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const listDocRef = await createList(userId, userEmail, newListName);
		setNewListSuccess(findNewList(listDocRef));
		setShowMessage(true);
		setNewListName('');
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{userId}
			{userEmail}
			<form method="POST" onSubmit={handleSubmit}>
				<label htmlFor="listName">
					New list name:
					<input
						type="text"
						name="listName"
						value={newListName}
						onChange={handleChange}
					/>
				</label>
				<button>Create</button>
			</form>
			{showMessage ? (
				<div>
					{newListSuccess
						? 'List created successfully!'
						: 'There was an error creating the list'}
				</div>
			) : null}
			<ul>
				{data.map((item, index) => {
					return (
						<SingleList
							key={index}
							name={item.name}
							path={item.path}
							setListPath={setListPath}
						/>
					);
				})}
			</ul>
		</div>
	);
}
