import './SingleList.css';
import { useNavigate } from 'react-router-dom';

export function SingleList({ name, path, setListPath }) {
	const navigate = useNavigate();

	function handleClick() {
		setListPath(path);
		navigate('/list');
	}

	return (
		<li className="SingleList flex flex-col items-center w-full">
			<button
				className="border-2 border-sage rounded-lg bg-pale-green my-2 px-3 py-2 text-off-black w-full md:w-1/2"
				onClick={handleClick}
			>
				{name}
			</button>
		</li>
	);
}
