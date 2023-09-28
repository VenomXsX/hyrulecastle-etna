import { Char, Gamemode, MonsterAndFloor, SaveType } from '../../types/type';
import * as rl from 'readline-sync';
import createChar from '../create_char';
import * as fs from 'fs';

function getBossWithProbability(bosses: Char[]) {
	const highestRarity = bosses.reduce(
		(acc, item) => (acc < item.rarity ? item.rarity : acc),
		0,
	);
	let rarities: any[] = [];
	// create an array of probabilities
	for (let i = 0; i <= highestRarity; i++)
		for (let j = 0; j < i; j++) rarities.push(highestRarity - i + 1);

	const index = Math.floor(Math.random() * rarities.length);
	const filteredBosses = bosses.filter((x) => x.rarity === rarities[index]);
	return filteredBosses[Math.floor(Math.random() * filteredBosses.length)];
}

function gameInit(mode: Gamemode) {
	const name: string =
		mode === 'enhanced' ? rl.question("What's your name: ") : 'Link';
	const players = JSON.parse(
		fs.readFileSync('./data/players.json', 'utf-8'),
	) as Char[]; // 1
	const monsters = JSON.parse(
		fs.readFileSync('./data/enemies.json', 'utf-8'),
	) as Char[]; // 11
	const bosses = JSON.parse(
		fs.readFileSync('./data/bosses.json', 'utf-8'),
	) as Char[]; // 0
	const boss = getBossWithProbability(bosses);
	const player: Char & { max_hp: number } =
		name === 'Link'
			? { ...players[0], max_hp: players[0].hp }
			: { ...players[0], max_hp: players[0].hp }; // TODO: createChar here
	const floor = 10; // TODO: add dynamic
	let monstersWithFloor: MonsterAndFloor = [];
	// push enemies in array and bosses in every 10 floors
	for (let i = 0; i < floor; i++) {
		if (i % 9 === 0 && i !== 0) {
			monstersWithFloor.push([boss]);
			continue;
		}
		monstersWithFloor.push([monsters[11]]);
	}

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
