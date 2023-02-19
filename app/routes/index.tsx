import { Link } from '@remix-run/react';

export default function Index() {
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
			<h1>Dark Duck</h1>
			<Link to='/login' prefetch='intent'>
				Log in
			</Link>
		</div>
	);
}
