import './Home.css';
import { SingleList } from '../components/SingleList.jsx';
import { useState, useEffect } from 'react';
import { createList } from '../api/firebase.js';
import { useNavigate } from 'react-router-dom';

export function Home({ data, userId, userEmail, listPath, setListPath }) {
	const [newListName, setNewListName] = useState('');
	const [newListSuccess, setNewListSuccess] = useState(null);
	const [showMessage, setShowMessage] = useState(false);

	const navigate = useNavigate();

	const findNewList = (docRef) =>
		docRef ? docRef._key.path.segments[1] === newListName : false;

	const handleChange = (e) => {
		setNewListName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setNewListSuccess(await createList(userId, userEmail, newListName));
		// const listDocRef = await createList(userId, userEmail, newListName);
		// await setNewListSuccess(findNewList(listDocRef));
		updatePath();
		// await setListPath(`${userId}/${newListName}`);
		// navigate('/list');
		setShowMessage(true);
		setNewListName('');
	};

	const updatePath = async () => {
		if (newListSuccess) await setListPath(`${userId}/${newListName}`);
	};

	// console.log(newListSuccess);

	// console.log(
	// 	data.map((list) => {
	// 		return list.name;
	// 	}),
	// );

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{userId}
			{userEmail}
			<form onSubmit={handleSubmit}>
				<label htmlFor="listName">
					New list name:
					<input
						type="text"
						name="listName"
						value={newListName}
						onChange={handleChange}
						onKeyDown={(e) => {
							if (e.key === 'Enter') handleSubmit(e);
						}}
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
