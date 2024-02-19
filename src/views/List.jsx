import { ListItem } from '../components';
import { useState, useEffect } from 'react';

export function List({ data }) {
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState(data);

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const reset = (e) => {
		e.preventDefault();
		setFilteredData(data);
		setSearchTerm('');
	};

	useEffect(() => {
		setFilteredData(
			data.filter((item) => {
				const itemName = item.name.toLowerCase();
				return itemName.includes(searchTerm.toLowerCase());
			}),
		);
	}, [data, searchTerm]);

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
					return <ListItem key={item.id} name={item.name} />;
				})}
			</ul>
		</>
	);
}
