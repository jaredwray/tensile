import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export const options = {
	githubPath: 'jaredwray/tensile',
	outputPath: './site/dist',
	siteTitle: 'Tensile',
	siteDescription: 'A Modern Enterprise Auth Framework',
	siteUrl: 'https://tensile.dev',
};

export const onPrepare = async config => {
	const readmePath = path.join(process.cwd(), './README.md');
	const readmeSitePath = path.join(config.sitePath, 'README.md');
	const readme = await fs.promises.readFile(readmePath, 'utf8');
	const updatedReadme = readme.replace('![site/logo.svg](site/logo.svg)', '');
	console.log('Writing updated readme to', readmeSitePath);
	await fs.promises.writeFile(readmeSitePath, updatedReadme);
};
