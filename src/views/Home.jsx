import './Home.css';
import { SingleList } from '../components/SingleList.jsx';
import { useState } from 'react';
import { createList } from '../api/firebase.js';
import { useNavigate } from 'react-router-dom';
import { auth } from '../api/config.js';
import { IoBulbOutline } from 'react-icons/io5';

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
		<div className="Home mt-8 font-Rubik mx-8 md:mx-24 h-min-content">
			{!auth.currentUser ? (
				<>
					<section className="border border-dark-green py-8 px-12 text-off-black text-center tiny:mt-6 xs:mt-24 sm:mt-32 items-center justify-center bg-sage/75 rounded-2xl">
						<h1 className="text-4xl xs:text-5xl font-semibold">
							Welcome to Basket Buddy!
						</h1>
						<h2 className="italic">We're nacho average shopping list. </h2>
					</section>
					<section className="border border-dark-green py-8 px-12 text-off-black tiny:mt-14 items-center justify-center bg-sage/50 rounded-2xl">
						<p className="font-semibold">
							<IoBulbOutline className="inline h-8 text-4xl -mt-2" /> Get
							Started :
						</p>
						<p>
							Create your account by clicking the{' '}
							<span className="font-medium">sign in</span> button above. You'll
							be making and sharing lists in no time!
						</p>
					</section>
				</>
			) : (
				<>
					<form
						onSubmit={handleSubmit}
						className="flex rounded-lg items-center gap-x-6"
					>
						<label htmlFor="listName" className="text-off-black">
							New list:
						</label>
						<input
							type="text"
							id="listName"
							name="listName"
							value={newListName}
							onChange={handleChange}
							className="border-2 border-sage rounded-lg min-h-14 bg-white grow text-xl xs:text-2xl text-off-black"
						/>
						<button className="bg-pale-green rounded-lg px-3 py-1 border-2 border-sage text-off-black">
							Create
						</button>
					</form>
					<ul className="flex flex-col my-8 items-center text-2xl">
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
				</>
			)}
		</div>
	);
}
