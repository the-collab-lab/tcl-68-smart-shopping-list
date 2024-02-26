import { ListItem } from '../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function List({ data, listPath }) {
	const [searchTerm, setSearchTerm] = useState('');

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

	const filteredData = data.filter((item) => {
		const itemName = item.name.toLowerCase();
		return itemName.includes(searchTerm.toLowerCase());
	});

	return (
		<>
			{!listPath && (
				<>
					<h2>
						You haven't selected a list yet. Click below to select a list.
					</h2>
					<button onClick={() => handleClick('/')}>Select a list</button>
				</>
			)}
			{listPath && data.length === 0 && (
				<>
					<h2>
						This list is currently empty. Click below to add your first item.
					</h2>
					<button onClick={() => handleClick('/manage-list')}>
						Add first item
					</button>
				</>
			)}
			{data.length > 0 && (
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
					{searchTerm && <button onClick={reset}>Reset</button>}
				</form>
			)}
			<ul>
				{filteredData.map((item) => {
					return <ListItem key={item.id} name={item.name} />;
				})}
			</ul>
		</>
	);
}
