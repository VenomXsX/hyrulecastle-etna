import { Char, MonsterAndFloor } from '../../types/type';
import * as rl from 'readline-sync';
import createChar from '../create_char';
import * as fs from 'fs';

function gameInit(mode: 'default' | 'enhanced') {
	const name: string = rl.question("What's your name: ");
	const players = JSON.parse(fs.readFileSync('./data/players.json', 'utf-8')); // 1
	const monsters = JSON.parse(fs.readFileSync('./data/enemies.json', 'utf-8')); // 12
	const player: Char = !name ? players[0] : createChar();
	const floor = 10; // TODO: add dynamic
	const monstersWithFloor: MonsterAndFloor = Array(floor).fill([
		monsters[11],
	]);
	console.dir(
		{
			player,
			floor,
			monsters: monstersWithFloor,
		},
		{ depth: null },
	);
}
export default gameInit;
