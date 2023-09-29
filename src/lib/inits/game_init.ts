import {
	Char,
	Difficulty,
	Gamemode,
	MonsterAndFloor,
	SaveType,
	Item,
	Class,
	Spell,
} from '../../types/type';
import createChar from '../create_char';
import characterSelection from '../character_selection';
import getMobWithProbability from './get_entities_by_rarity';
import { _debug, getJsonFromFile } from '../../utils/helper';
import chooseDifficulty from '../choose_difficulty';
import chooseFloor from './choose_floor';
import { searchObjById } from '../handle_object';

function getModifierForMobs(
	monsters: Char[],
	mode: Gamemode,
	multiplier: number,
) {
	const monster = getMobWithProbability(monsters);
	const modifiedMonster = Object.keys(
		mode === 'enhanced' ? monster : monsters[11],
	).reduce((acc: Partial<Char>, current): Partial<Char> => {
		const mob =
			mode === 'enhanced' ? getMobWithProbability(monsters) : monsters[11];

		if (
			['hp', 'mp', 'str', 'int', 'def', 'res', 'spd', 'luck'].includes(current)
		) {
			return { ...acc, [current]: (mob[current] *= multiplier) };
		}
		return { ...acc, [current]: mob[current] };
	}, {}) as Char;
	return modifiedMonster;
}

function gameInit(mode: Gamemode): SaveType {
	let player_character_id: number = -1;
	let player_difficulty: Difficulty = 'normal';
	let multiplier: number = 1;
	if (mode === 'default') {
		player_character_id = characterSelection();
	} else {
		player_character_id = characterSelection();
		player_difficulty = chooseDifficulty();
	}

	switch (player_difficulty) {
		case 'difficult':
			multiplier = 1.5;
		case 'insane':
			multiplier = 2;
	}

	const players = getJsonFromFile<Char[]>('./data/players.json');
	const monsters = getJsonFromFile<Char[]>('./data/enemies.json');
	const bosses = getJsonFromFile<Char[]>('./data/bosses.json');
	const items = getJsonFromFile<Item[]>('./data/items.json');
	const classes = getJsonFromFile<Class[]>('./data/classes.json');
	const spells = getJsonFromFile<Spell[]>('./data/spells.json');

	_debug(searchObjById(monsters, 3));

	const boss = getMobWithProbability(bosses);
	const modifiedBoss = Object.keys(boss).reduce(
		// transform Char to partial (means make properties to optional)
		(acc: Partial<Char>, current): Partial<Char> => {
			if (
				['hp', 'mp', 'str', 'int', 'def', 'res', 'spd', 'luck'].includes(
					current,
				)
			) {
				return { ...acc, [current]: (boss[current] *= multiplier) };
			}
			return { ...acc, [current]: boss[current] };
		},
		{},
	) as Char; // reset type to required properties

	const player: Char & { max_hp: number } =
		player_character_id === 0
			? { ...players[0], max_hp: players[0].hp }
			: createChar(player_character_id);

	console.clear();

	const floor: number = mode === 'enhanced' ? chooseFloor() : 10;

	let monstersWithFloor: MonsterAndFloor = [];
	// push enemies in array and bosses in every 10 floors
	for (let i = 0; i < floor; i++) {
		if ((i + 1) % 10 === 0 && i !== 0) {
			monstersWithFloor.push([modifiedBoss]);
			continue;
		}
		monstersWithFloor.push([getModifierForMobs(monsters, mode, multiplier)]);
	}

	//FIXME: [DEBUG]
	// _debug({
	// 	player,
	// 	floor,
	// 	gamemode: mode,
	// 	monsters: monstersWithFloor,
	// 	inventory: [],
	// 	difficulty: player_difficulty,
	// });

	return {
		player,
		floor,
		classes,
		spells,
		gamemode: mode,
		monsters: monstersWithFloor,
		inventory: items,
		difficulty: player_difficulty,
		player_lvl: 1,
		player_exp: 0,
	};
}
export default gameInit;
