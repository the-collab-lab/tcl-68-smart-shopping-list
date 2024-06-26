import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import { AddItem, ListItem } from '../components';
import { ListHeader } from '../components/ListHeader.jsx';
import { auth } from '../api/config.js';

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
			{!auth.currentUser ? (
				<div className="border border-dark-green py-8 px-12 mx-8 md:mx-24 text-off-black text-center tiny:mt-18 xs:mt-32 sm:mt-40 items-center justify-center bg-sage/75 rounded-2xl font-medium">
					Sign in to see your lists.
				</div>
			) : (
				<>
					{listPath ? <ListHeader text={listName} /> : null}
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

					<section className="mx-8 md:mx-24 flex flex-col">
						{listPath ? <AddItem data={data} listPath={listPath} /> : null}
						{data.length > 0 ? (
							<section className="mt-8 mb-4">
								<form className="flex flex-wrap items-center gap-x-6">
									<label htmlFor="itemFilter" className="text-off-black">
										Filter:
									</label>
									<input
										type="text"
										id="itemFilter"
										name="itemFilter"
										value={searchTerm}
										onChange={handleChange}
										className="bg-white border-solid border-2 rounded-xl border-sage pl-2 min-h-14 grow max-w-full mt-2 text-xl xs:text-2xl text-off-black"
									/>
									{searchTerm ? (
										<button
											onClick={reset}
											className="bg-red-400 rounded-xl px-3 py-1 grow min-h-14 xs:max-w-28 mt-2 text-off-black"
										>
											Reset
										</button>
									) : null}
								</form>
							</section>
						) : null}
						{listPath && data.length === 0 ? (
							<div className="bg-pale-green border border-dark-green rounded-xl py-8 mt-8">
								<h3 className="text-center font-semibold text-off-black">
									This list is currently empty!
								</h3>
							</div>
						) : null}

						<section>
							<ul>
								{filteredData.map((item) => {
									return (
										<ListItem key={item.id} item={item} listPath={listPath} />
									);
								})}
							</ul>
						</section>
					</section>
				</>
			)}
		</>
	);
}
