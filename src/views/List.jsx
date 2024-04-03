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
		<>
			{listPath ? <ListHeader text={listName} /> : null}
			<section className="mx-8 md:mx-24">
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
				{listPath ? <AddItem data={data} listPath={listPath} /> : null}
				{listPath && data.length === 0 ? (
					<div className="bg-pale-green border border-dark-green rounded-2xl py-8 mt-8">
						<h3 className="text-center font-semibold">
							This list is currently empty!
						</h3>
					</div>
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

				<section>
					<ul>
						{filteredData.map((item) => {
							return <ListItem key={item.id} item={item} listPath={listPath} />;
						})}
					</ul>
				</section>
			</section>
		</>
	);
}
