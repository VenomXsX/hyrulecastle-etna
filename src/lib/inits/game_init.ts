import { Char, Gamemode, MonsterAndFloor, SaveType } from '../../types/type';
import * as rl from 'readline-sync';
import createChar from '../create_char';
import * as fs from 'fs';

function gameInit(mode: Gamemode) {
	const name: string =
		mode === 'enhanced' ? rl.question("What's your name: ") : 'Link';
	const players = JSON.parse(fs.readFileSync('./data/players.json', 'utf-8')); // 1
	const monsters = JSON.parse(fs.readFileSync('./data/enemies.json', 'utf-8')); // 11
	const player: Char = name === 'Link' ? players[0] : createChar();
	const floor = 10; // TODO: add dynamic
	const monstersWithFloor: MonsterAndFloor = Array(floor).fill([monsters[11]]);

	return {
		player,
		floor,
		gamemode: mode,
		monsters: monstersWithFloor,
		inventory: [],
	};
}
export default gameInit;
