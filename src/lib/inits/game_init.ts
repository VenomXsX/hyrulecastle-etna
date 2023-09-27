import { Char, Gamemode, MonsterAndFloor, SaveType } from '../../types/type';
import * as rl from 'readline-sync';
import createChar from '../create_char';
import * as fs from 'fs';

function gameInit(mode: Gamemode) {
	const name: string =
		mode === 'enhanced' ? rl.question("What's your name: ") : 'Link';
	const players = JSON.parse(fs.readFileSync('./data/players.json', 'utf-8')); // 1
	const monsters = JSON.parse(fs.readFileSync('./data/enemies.json', 'utf-8')); // 11
	const bosses = JSON.parse(fs.readFileSync('./data/bosses.json', 'utf-8')); // 0
	const player: Char & { max_hp: number } =
		name === 'Link' ? players[0] : createChar();
	const floor = 10; // TODO: add dynamic
	let monstersWithFloor: MonsterAndFloor = [];
	// push enemies in array and bosses in every 10 floors
	for (let i = 0; i < floor; i++) {
		if (i % 9 === 0 && i !== 0) {
			monstersWithFloor.push([bosses[0]]);
			continue;
		}
		monstersWithFloor.push([monsters[11]]);
	}
	player.max_hp = player.hp;

	// FIXME: [DEBUG]
	// console.dir(
	// 	{
	// 		player,
	// 		floor,
	// 		gamemode: mode,
	// 		monsters: monstersWithFloor,
	// 		inventory: [],
	// 	},
	// 	{
	// 		depth: null,
	// 	},
	// );

	return {
		player,
		floor,
		gamemode: mode,
		monsters: monstersWithFloor,
		inventory: [],
	};
}
export default gameInit;
