import './SingleList.css';

export function SingleList({ name, path, setListPath }) {
	console.log(name);
	function handleClick() {
		setListPath(path);
	}

	return (
		<li className="SingleList">
			<button onClick={handleClick}>{name}</button>
		</li>
	);
}
