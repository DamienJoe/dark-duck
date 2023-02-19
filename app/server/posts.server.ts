import { z } from 'zod';
import fs from 'fs';
import { prisma } from '~/db.server';
import os from 'os';

export const createPostSchema = z.object({
	email: z.string().email(),
});

export const createPost = async ({
	email,
	file,
}: {
	email: string;
	file: File;
}) => {
	//  save file to ~/audio/* directory and get filename with filesystem
	// transform file to buffer
	const fileToBuffer = await file.arrayBuffer();
	// convert buffer to array
	const buffer = new Uint8Array(fileToBuffer);
	// check if directory "audio" exists
	const fileDir = `${__dirname}/audio`;
	const dirExists = await fs.existsSync(fileDir);

	console.log({ fileDir });
	if (!dirExists) {
		throw new Error('Directory does not exist');
	}
	const savedFile = await fs.writeFileSync(
		`${fileDir}/${new Date().toISOString() + file.name}`,
		buffer
	);

	console.log(savedFile);

	await prisma.post.create({
		data: {
			audioFileUrl: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
			user: {
				connect: {
					email,
				},
			},
		},
	});
};
