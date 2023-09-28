import { Char } from '../types/type';
import * as fs from 'fs';

function createChar(characterID: number) {
	const characters: Char[] = JSON.parse(
		fs.readFileSync('./data/players.json', 'utf-8'),
	);
	const player_character: Char = characters.filter(
		(character) => character.id === characterID,
	)[0];

	return { ...player_character, max_hp: player_character.hp };
}

export default createChar;
