import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>
				{data.map((item, index) => {
					return <ListItem key={index} name={item.id} />;
				})}
			</ul>
		</>
	);
}
