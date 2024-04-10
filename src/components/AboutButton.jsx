import { BsQuestionCircleFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

export const AboutButton = () => {
	return (
		<NavLink to="/about" className="m-4">
			<BsQuestionCircleFill
				className="text-off-black text-5xl"
				alt="about page link"
			/>
		</NavLink>
	);
};
