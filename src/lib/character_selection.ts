import color from '../utils/color';
import { Char } from '../types/type';
import { input, sleep, strCapitalize } from '../utils/helper';
import * as fs from 'fs';
import { press_to_continue } from '../utils/helper';
import getMobWithProbability from './inits/get_mob_with_probability';

function characterSelection(id?: number) {
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
		console.log('');
		console.log(color(`Enter 'random' to play as a random character`, 'yellow'));
	});
	console.log('');
	let userInput = '';
	while (true) {
		userInput = strCapitalize(
			input('Who do you wish to play as? (Default: Link) '),
		);

		if (userInput === '') {
			userInput = 'Link';
			break;
		}
		if (userInput === 'Random') {
			userInput = getMobWithProbability(characters).name;
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

	// let userConfirmation: string = '';
	// let returned_value: number = id ? id : playerCharacter[0].id;
	// while (!userConfirmation) {
	// 	userConfirmation = input(
	// 		`\nReselect character? ${color('[y/n]', 'white')}: `,
	// 	).toLowerCase();
	// 	if (!['y', 'n'].includes(userConfirmation)) {
	// 		userConfirmation = '';
	// 	}
	// 	if (userConfirmation === 'y') {
	// 		returned_value = characterSelection(returned_value);
	// 	}
	// 	if (userConfirmation === 'n') break;
	// }
	//press_to_continue();

	console.log(`\nYou will play as ${color(finalResponse, 'cyan')}`);
	press_to_continue();
	return playerCharacter[0].id;
}

export default characterSelection;
