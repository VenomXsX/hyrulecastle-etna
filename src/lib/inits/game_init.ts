import { Char, Gamemode, MonsterAndFloor, SaveType } from '../../types/type';
import createChar from '../create_char';
import characterSelection from '../character_selection';
import getBossWithProbability from './get_boss_with_probability';
import { _debug, getJsonFromFile, input } from '../../utils/helper';
import chooseDifficulty from '../choose_difficulty';

function gameInit(mode: Gamemode): SaveType {
	let player_character_id: number = -1;
	let player_difficulty: string = '';
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

	const boss: Char = Object.keys(getBossWithProbability(bosses)).reduce(
		(acc: Char, current): Char => {
			if (
				['hp', 'mp', 'str', 'int', 'def', 'res', 'spd', 'luck'].includes(
					current,
				)
			) {
				return { ...acc, [current]: (boss[current] *= multiplier) };
			}
			return { ...acc, [current]: boss[current] };
		},
	);

	const player: Char & { max_hp: number } =
		player_character_id === 0
			? { ...players[0], max_hp: players[0].hp }
			: createChar(player_character_id);
	const floor: number = mode === 'enhanced' ? 10 : 10; // TODO: add dynamic
	let monstersWithFloor: MonsterAndFloor = [];

	// push enemies in array and bosses in every 10 floors
	for (let i = 0; i < floor; i++) {
		if ((i + 1) % 10 === 0 && i !== 0) {
			monstersWithFloor.push([boss]);
			continue;
		}
		monstersWithFloor.push([monsters[11]]);
	}

	//FIXME: [DEBUG]
	_debug({
		// player,
		// floor,
		// gamemode: mode,
		monsters: monstersWithFloor,
		inventory: [],
		difficulty: player_difficulty,
	});

	return {
		player,
		floor,
		gamemode: mode,
		monsters: monstersWithFloor,
		inventory: [],
		difficulty: player_difficulty,
	};
}
export default gameInit;
