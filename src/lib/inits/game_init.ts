import { Char, Gamemode, MonsterAndFloor, SaveType } from '../../types/type';
import * as rl from 'readline-sync';
import createChar from '../create_char';
import * as fs from 'fs';
import characterSelection from '../character_selection';

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
	let player_character_id: number = -1;
	if (mode === 'default') {
		player_character_id = characterSelection();
	} else {
		player_character_id = characterSelection(); // à refaire
	}

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
		player_character_id === 0
			? { ...players[0], max_hp: players[0].hp }
			: createChar(player_character_id);
	const floor = 10; // TODO: add dynamic
	let monstersWithFloor: MonsterAndFloor = [];
	// push enemies in array and bosses in every 10 floors
	// FIXME: rework modulo to % 10
	for (let i = 0; i < floor; i++) {
		if ((i + 1) % 10 === 0 && i !== 0) {
			monstersWithFloor.push([boss]);
			continue;
		}
		monstersWithFloor.push([monsters[11]]);
	}

	//FIXME: [DEBUG]
	// fs.writeFileSync(
	// 	'./test.json',
	// 	JSON.stringify(
	// 		{
	// 			player,
	// 			floor,
	// 			gamemode: mode,
	// 			monsters: monstersWithFloor,
	// 			inventory: [],
	// 		},
	// 		null,
	// 		2,
	// 	),
	// );
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
