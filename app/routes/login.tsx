import type { ActionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form } from '@remix-run/react';
import React from 'react';

export const loader = async () => {
	return json({});
};

export const action = async ({ request }: ActionArgs) => {
	const formData = await request.formData();
	return json({});
};

const LoginPage = () => {
	return (
		<div>
			<Form method='post'>
				<input
					type='email'
					name='email'
					defaultValue={'virgileboris96@hotmail.fr'}
				/>
				<input type='password' name='password' defaultValue={'Darkduck'} />
				<button type='submit'> Login</button>
			</Form>
		</div>
	);
};

export default LoginPage;
