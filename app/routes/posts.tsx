import type { ActionArgs } from '@remix-run/node';
import {
	unstable_composeUploadHandlers,
	unstable_createFileUploadHandler,
	unstable_createMemoryUploadHandler,
	unstable_parseMultipartFormData,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { createPost, createPostSchema } from '~/server/posts.server';

export const loader = async () => {
	return json({});
};

export const action = async ({ request }: ActionArgs) => {
	const uploadHandler = unstable_composeUploadHandlers(
		unstable_createFileUploadHandler({
			maxPartSize: 5_000_000,
			file: ({ filename }) => filename,
		}),
		// parse everything else into memory
		unstable_createMemoryUploadHandler()
	);
	const formData = await unstable_parseMultipartFormData(
		request,
		uploadHandler
	);
	const { email } = createPostSchema.parse(Object.fromEntries(formData));
	const file = formData.get('file') as File;

	await createPost({ email, file });

	console.log(file);

	console.log(data);
	return json({});
};

const PostPage = () => {
	const detectMediaDevices = async () => {
		if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
			//Feature is not supported in browser
			//return a custom error
			return Promise.reject(
				new Error(
					'mediaDevices API or getUserMedia method is not supported in this browser.'
				)
			);
		}
		//Feature is supported in browser
		//...

		const mediaDevices = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false,
		});

		console.log({ mediaDevices });
	};

	// const startAudioRecording = async () => {
	// 	const stream = await navigator.mediaDevices.getUserMedia({
	// 		audio: true,
	// 		video: false,
	// 	});
	// 	const mediaRecorder = new MediaRecorder(stream);
	// 	mediaRecorder.start();
	// 	setIsRecording(true);
	// };

	// const stopAudioRecording = async () => {
	// 	const stream = await navigator.mediaDevices.getUserMedia({
	// 		audio: true,
	// 		video: false,
	// 	});
	// 	const mediaRecorder = new MediaRecorder(stream);
	// 	mediaRecorder.stop();
	// 	setIsRecording(false);
	// };

	// React.useEffect(() => {
	// 	if (typeof window === 'undefined') return;
	// 	detectMediaDevices();
	// }, []);

	// const [isRecording, setIsRecording] = React.useState(false);
	return (
		<main className='py-12 px-8'>
			<h1 className='font-bold text-2xl'>Posts</h1>
			<Form
				method='post'
				className='flex flex-col gap-4'
				encType='multipart/form-data'
			>
				<input
					type='email'
					name='email'
					defaultValue={'virgileboris96@hotmail.fr'}
					className='px-4 py-2 border border-black'
				/>

				<input
					type='file'
					name='file'
					accept='audio/*'
					className='px-4 py-2 border border-black'
					required
					capture
				/>
				{/* <button
					className='px-4 py-2 bg-black text-white border border-black'
					type='button'
					onClick={isRecording ? stopAudioRecording : startAudioRecording}
				>
					{isRecording ? 'Stop' : 'Start'}
				</button> */}
				<button
					type='submit'
					className='px-4 py-2 bg-black text-white border border-black'
				>
					{' '}
					Poster le fichier audio
				</button>
			</Form>
		</main>
	);
};

export default PostPage;
