import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
	Link,
	Links,
	LiveReload,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';
import resetStyles from '~/styles/reset.css';
import appStyles from '~/styles/app.css';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'A social media open source platform',
	viewport: 'width=device-width,initial-scale=1',
});
export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: resetStyles },
		{ rel: 'stylesheet', href: appStyles },
		{
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;900&display=swap',
		},
	];
};

export default function App() {
	return (
		<html lang='en' className='h-full'>
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<nav className='flex flex-row gap-4 w-full px-8 py-2'>
					<NavLink
						to='/'
						prefetch='intent'
						className={({ isActive }) =>
							`text-sky-500 text-md ${isActive ? 'underline' : ''}`
						}
					>
						Accueil
					</NavLink>
					<NavLink
						to='/login'
						prefetch='intent'
						className={({ isActive }) =>
							`text-sky-500 text-md ${isActive ? 'underline' : ''}`
						}
					>
						Login
					</NavLink>
					<NavLink
						to='/posts'
						prefetch='intent'
						className={({ isActive }) =>
							`text-sky-500 text-md ${isActive ? 'underline' : ''}`
						}
					>
						Posts
					</NavLink>
				</nav>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
