import './Home.css';
import { SingleList } from '../components/SingleList.jsx';
import { useState, useEffect } from 'react';
import { createList } from '../api/firebase.js';
import { useNavigate } from 'react-router-dom';

export function Home({ data, userId, userEmail, setListPath }) {
	const [newListName, setNewListName] = useState('');
	const [newListSuccess, setNewListSuccess] = useState(null);
	const [message, setMessage] = useState(null);

	const navigate = useNavigate();

	const handleChange = (e) => {
		setNewListName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const currentLists = data.map((list) => {
			return list.name;
		});

		//Check if the new list has a title that already exists in db
		if (currentLists.indexOf(newListName) > -1) {
			alert('List already exists. Please enter a unique list name.');
		} else {
			//Create new list
			const response = await createList(userId, userEmail, newListName);
			//If list creation successful, set states
			if (response) {
				setNewListSuccess(true);
				setMessage('List created successfully.');
				//If list creation error, set states
			} else {
				setNewListSuccess(false);
				setMessage('List could not be created.');
			}
		}

		await setListPath(`${userId}/${newListName}`);
		setNewListName('');
	};

	useEffect(() => {
		if (newListSuccess) {
			alert(message);
			navigate('/list');
		} else if (newListSuccess === false) {
			alert(message);
		}
	}, [newListSuccess, navigate]);

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
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
