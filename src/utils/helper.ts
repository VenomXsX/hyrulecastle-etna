import * as rl from 'readline-sync';
import * as fs from 'fs';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const press_to_continue = () => input('Press [ENTER] to continue...');
const strCapitalize = (str?: string) =>
	str && str[0] ? str[0].toUpperCase() + str.slice(1) : '';
const _debug = (data: string | object) =>
	fs.writeFileSync('./test.json', JSON.stringify(data, null, 2));
const input = (message: string | undefined) => rl.question(message);
const getJsonFromFile = <T>(path: string): T =>
	JSON.parse(fs.readFileSync(path, 'utf-8'));

const handleEvent = (event: NodeJS.ReadStream, state: 'on' | 'off') => {
	if (state === 'on') {
		event.setRawMode(true);
		event.resume();
	} else {
		event.setRawMode(false);
		event.pause();
	}
};

const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export {
	sleep,
	press_to_continue,
	strCapitalize,
	_debug,
	input,
	getJsonFromFile,
	handleEvent,
	randomIntFromInterval,
};
