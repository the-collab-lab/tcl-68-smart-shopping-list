import './Home.css';
import { SingleList } from '../components/SingleList.jsx';
import { useState } from 'react';
import { createList } from '../api/firebase.js';
import { useNavigate } from 'react-router-dom';

export function Home({ data, userId, userEmail, setListPath }) {
	const [newListName, setNewListName] = useState('');

	const navigate = useNavigate();

	const handleChange = (e) => {
		setNewListName(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (newListName.includes('/')) {
			alert(
				'Invalid list name. "/" is an unsupported character, please try a different list name.',
			);
			return;
		}

		const currentLists = data.map((list) => {
			return list.name;
		});

		//Check if the new list has a title that already exists in db
		if (currentLists.includes(newListName)) {
			alert('List already exists. Please enter a unique list name.');
			return;
		}

		//Create new list
		const response = await createList(userId, userEmail, newListName);
		//If list creation successful, show alert and navigate to new list view
		if (response) {
			alert('List created successfully.');
			setListPath(`${userId}/${newListName}`);
			navigate('/list');
			//If list creation error, show alert
		} else {
			alert('List could not be created.');
		}

		setNewListName('');
	};

	return (
		<div className="Home mt-8 font-Rubik">
			<form
				onSubmit={handleSubmit}
				className="flex justify-between rounded-lg items-center"
			>
				<label htmlFor="listName">
					New list:
					<input
						type="text"
						id="listName"
						name="listName"
						value={newListName}
						onChange={handleChange}
						className="w-2/3 ml-2 border-2 border-sage rounded-lg"
					/>
				</label>
				<button className="bg-sage rounded-lg px-3 py-1 text-eggshell">
					Create
				</button>
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
