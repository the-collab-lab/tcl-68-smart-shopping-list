import { Outlet, NavLink } from 'react-router-dom';
import { IoHome, IoList, IoCreate } from 'react-icons/io5';

import './Layout.css';
import { auth } from '../api/config.js';
import { useAuth, SignInButton, SignOutButton } from '../api/useAuth.jsx';
import buddyLogo from '../../public/img/basket-buddy-logo.png';

export function Layout() {
	const { user } = useAuth();
	const activeLink =
		'Nav-link text-sage border-2 border-sage rounded-full bg-eggshell';
	const link =
		'Nav-link text-eggshell border-2 rounded-full border-vanilla  hover:text-sage hover:border-sage';
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
							className={({ isActive }) => (isActive ? activeLink : link)}
						>
							<IoHome alt="Home" />
						</NavLink>
						<NavLink
							to="/list"
							className={({ isActive }) => (isActive ? activeLink : link)}
						>
							<IoList alt="List" />
						</NavLink>
						<NavLink
							to="/manage-list"
							className={({ isActive }) => (isActive ? activeLink : link)}
						>
							<IoCreate alt="Manage List" />
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}
