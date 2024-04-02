import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import { AddItem, ListItem } from '../components';
import { ListHeader } from '../components/ListHeader.jsx';

export function List({ data, listPath }) {
	const [searchTerm, setSearchTerm] = useState('');
	const listName = listPath?.split('/')[1];

	const navigate = useNavigate();

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const reset = (e) => {
		e.preventDefault();
		setSearchTerm('');
	};

	const handleClick = (selectedPath) => {
		navigate(selectedPath);
	};

	let filteredData = data.filter((item) => {
		const itemName = item.name.toLowerCase();
		return itemName.includes(searchTerm.toLowerCase());
	});

	filteredData.sort(comparePurchaseUrgency);

	return (
		<section className="mx-8 md:mx-24">
			{listPath ? (
				<>
					<ListHeader text={listName} />
					<AddItem data={data} listPath={listPath} />
				</>
			) : null}
			{data.length > 0 ? (
				<section>
					<form>
						<label htmlFor="itemFilter">
							Search for an item:
							<input
								type="text"
								id="itemFilter"
								name="itemFilter"
								value={searchTerm}
								onChange={handleChange}
							/>
						</label>
						{searchTerm ? <button onClick={reset}>Reset</button> : null}
					</form>
				</section>
			) : null}
			{listPath && data.length === 0 ? (
				<h2>This list is currently empty!</h2>
			) : null}
			{!listPath ? (
				<>
					<h2>{listName}</h2>
					<AddItem data={data} listPath={listPath} />
				</>
			) : null}

			{!listPath ? (
				<>
					<h2>
						You haven't selected a list yet. Click below to select a list.
					</h2>
					<button onClick={() => handleClick('/')}>Select a list</button>
				</>
			) : null}

			<section>
				<ul>
					{filteredData.map((item) => {
						return <ListItem key={item.id} item={item} listPath={listPath} />;
					})}
				</ul>
			</section>
		</section>
	);
}
