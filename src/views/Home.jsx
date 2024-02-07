import './Home.css';
import { SingleList } from '../components/SingleList.jsx';

export function Home({ data, setListPath }) {
	console.log(data);
	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			<ul>
				{data.map((item) => {
					return (
						<SingleList
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
