import * as rl from 'readline-sync';
import * as fs from 'fs';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const press_to_continue = () => input('\nPress [ENTER] to continue...');
const strCapitalize = (str?: string) =>
	str && str[0] ? str[0].toUpperCase() + str.slice(1) : '';
const _debug = (data: string | object) =>
	fs.writeFileSync('./test.json', JSON.stringify(data, null, 2));
const input = (message: string | undefined) => rl.question(message);
const getJsonFromFile = <T>(path: string): T =>
	JSON.parse(fs.readFileSync(path, 'utf-8'));

export {
	sleep,
	press_to_continue,
	strCapitalize,
	_debug,
	input,
	getJsonFromFile,
};
