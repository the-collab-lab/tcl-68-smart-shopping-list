import { ListItem } from '../components';
import { useState } from 'react';

export function List({ listPath, data }) {
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const reset = (e) => {
		e.preventDefault();
		setSearchTerm('');
	};

	const filteredData = data.filter((item) => {
		const itemName = item.name.toLowerCase();
		return itemName.includes(searchTerm.toLowerCase());
	});

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
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
			<ul>
				{filteredData.map((item) => {
					return <ListItem key={item.id} item={item} listPath={listPath} />;
				})}
			</ul>
		</>
	);
}
