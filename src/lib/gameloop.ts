import { SaveType, TurnType, Char, TrapType } from '../types/type';
import * as glfunc from '../gameloop_functions/gameloop_functions';
import * as fs from 'fs';

async function runGame(gameData: SaveType) {
	// clone the gamedata so that we can maybe add a save feature
	let {
		player,
		monsters,
		floor,
		gamemode,
		difficulty,
		player_lvl,
		player_exp,
		inventory,
	} = structuredClone(gameData);
	let currentFloor: number = 0;
	let turn: TurnType = 'player';
	let traps: TrapType[] = JSON.parse(
		fs.readFileSync('./data/traps.json', 'utf-8'),
	);
	console.clear();

	let gameOver: boolean | undefined = false;

	while (!gameOver) {
		const player_remaining_hp_for_display: number = Math.round(
			(player.hp / player.max_hp) * 100,
		);
		const monster_remaining_hp_for_display: number = Math.round(
			(monsters[currentFloor][0].hp / gameData.monsters[currentFloor][0].hp) *
				100,
		);
		console.clear();

		// STATS DISPLAY
		glfunc.displayStats(currentFloor, floor, gamemode, difficulty);

		// LEVEL INFO
		glfunc.displayLevel(gamemode, player_lvl, player_exp);

		// HP BAR
		glfunc.displayHPBar({
			player_name: player.name,
			player_remaining_hp_for_display: player_remaining_hp_for_display,
			player_hp: player.hp,
			player_max_hp: player.max_hp,
			monster_name: monsters[currentFloor][0].name,
			monster_hp: monsters[currentFloor][0].hp,
			monster_max_hp: gameData.monsters[currentFloor][0].hp,
			monster_remaining_hp_for_display: monster_remaining_hp_for_display,
		});

		// BATTLE OPTION
		let returnState: [boolean, TurnType] = glfunc.displayBattlePhase({
			turn: turn,
			current_floor: currentFloor,
			monster_current_floor: monsters[currentFloor],
			playerObj: player,
		});

		turn = returnState[1];
		gameOver = returnState[0];

		// LAST MESSAGE & LEVELING & SPECIAL ROOM
		let playerstats: number[] = glfunc.displayLastmessageLevelingSpecialRoom({
			monster_current_floor_length: monsters[currentFloor].length,
			current_floor: currentFloor,
			floor: floor,
			gamemode: gamemode,
			inventoryObj: inventory,
			player_exp: player_exp,
			player_lvl: player_lvl,
			playerObj: player,
			trapsObj: traps,
		});
		currentFloor = playerstats[0]
		player_exp = playerstats[1],
		player_lvl = playerstats[2]
		if (player_exp >= 30) player_exp %= 30;
	}
}
export default runGame;
