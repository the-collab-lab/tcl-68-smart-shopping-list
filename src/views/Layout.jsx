import { Outlet, NavLink } from 'react-router-dom';
import { IoHome, IoList, IoCreate } from 'react-icons/io5';

import './Layout.css';
import { auth } from '../api/config.js';
import { useAuth, SignInButton, SignOutButton } from '../api/useAuth.jsx';
import buddyLogo from '../../public/img/basket-buddy-logo.png';

export function Layout() {
	const { user } = useAuth();
	return (
		<>
			<div className="Layout">
				<header
					className="Layout-header flex flex-col items-center  bg-eggshell
				text-off-black"
				>
					<img className="md:w-1/3" src={buddyLogo} alt="Basket Buddy" />
					{!!user ? (
						<div>
							<span>Signed in as {auth.currentUser.displayName}</span>
							<SignOutButton />
						</div>
					) : (
						<SignInButton />
					)}
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav bg-brown">
					<div className="Nav-container flex flex-row justify-around">
						<NavLink
							to="/"
							className="Nav-link border-2 rounded-full border-vanilla text-eggshell hover:text-sage"
						>
							<IoHome alt="Home" />
						</NavLink>
						<NavLink
							to="/list"
							className="Nav-link text-eggshell border-2 rounded-full border-vanilla hover:text-sage"
						>
							<IoList alt="List" />
						</NavLink>
						<NavLink
							to="/manage-list"
							className="Nav-link text-eggshell border-2 rounded-full border-vanilla hover:text-sage"
						>
							<IoCreate alt="Manage List" />
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
