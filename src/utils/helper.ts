import * as fs from 'fs';

export const outputText = (path: string) => {
	console.log(fs.readFileSync(path, 'utf-8'));
};
