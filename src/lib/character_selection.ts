import color from '../utils/color';
import { Char } from '../types/type';
import { strCapitalize } from '../utils/helper';
import * as rl from 'readline-sync';
import * as fs from 'fs';
import { press_to_continue } from '../utils/helper';

function characterSelection() {
	const characters: Char[] = JSON.parse(
		fs.readFileSync('./data/players.json', 'utf-8'),
	);
	const characters_ids = characters.map((character) => character.id);
	const characters_names = characters.map((character) => character.name);

	console.clear();
	console.log(
		`======[ ${color('Welcome to the Hyrule Castle', 'green')} ]======\n`,
	);
	characters.forEach((character) => {
		console.log(
			color(
				`${character.id}. ${character.name} [Race: ${character.race}, Class: ${character.class}]`,
				'cyan',
			),
		);
		console.log(
			`(HP: ${color(character.hp, 'green')}, MP: ${color(
				character.mp,
				'blue',
			)}, STR: ${color(character.str, 'red')}, INT: ${color(
				character.int,
				'magenta',
			)}, DEF: ${color(character.def, 'cyan')}, RES: ${color(
				character.res,
				'magenta',
			)}, SPD: ${color(character.spd, 'white')}, LUCK: ${color(
				character.luck,
				'green',
			)})\n`,
		);
	});
	console.log('');
	let userInput = '';
	while (true) {
		userInput = strCapitalize(
			rl.question('Who do you wish to play as? (Default: Link) '),
		);

		if (userInput === '') {
			userInput = 'Link';
			break;
		}
		if (
			characters_ids.includes(Number(userInput)) ||
			characters_names.includes(userInput)
		)
			break;
	}

	let finalResponse: string = '';
	if (isNaN(Number(userInput))) {
		finalResponse = characters_names.filter(
			(character) => character === userInput,
		)[0];
	} else {
		finalResponse = characters.filter(
			(character) => character.id === Number(userInput),
		)[0].name;
	}

	const playerCharacter: Char[] = characters.filter(
		(character) => character.name === finalResponse,
	);
	console.log(`\nYou will play as ${color(finalResponse, 'cyan')}`);
	press_to_continue();
	return playerCharacter[0].id;
}

export default characterSelection;
