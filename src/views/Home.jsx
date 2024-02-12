import './Home.css';
import { SingleList } from '../components/SingleList.jsx';
import { useState } from 'react';
import { createList } from '../api/firebase.js';

export function Home({ data, userId, userEmail, setListPath }) {
	const [newListName, setNewListName] = useState('');

	const handleChange = (e) => {
		setNewListName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createList({ userId }, { userEmail }, { newListName });
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
