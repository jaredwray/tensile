const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

module.exports.options = {
	githubPath: 'jaredwray/tensile',
	outputPath: './site/dist',
	siteTitle: 'Tensile',
	siteDescription: 'A Modern Enterprise Auth Framework',
	siteUrl: 'https://tensile.dev',
};

module.exports.onPrepare = async config => {
	const readmePath = path.join(process.cwd(), './README.md');
	const readmeSitePath = path.join(config.sitePath, 'README.md');
	const readme = await fs.promises.readFile(readmePath, 'utf8');
	const updatedReadme = readme.replace('<img src="site/logo.svg" alt="Hookified" height="400" align="center">\n\n', '');
	console.log('Writing updated readme to', readmeSitePath);
	await fs.promises.writeFile(readmeSitePath, updatedReadme);
};
