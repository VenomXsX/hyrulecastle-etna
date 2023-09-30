import { SaveType, TurnType, Char, TrapType } from '../types/type';
import * as glfunc from '../gameloop_functions/gameloop_functions';
import * as fs from 'fs';

async function runGame(gameData: SaveType) {
	// clone the gamedata so that we can maybe add a save feature
	let currentGameData: SaveType = structuredClone(gameData);
	let currentFloor: number = currentGameData.current_floor;
	let turn: TurnType = 'player';
	let traps: TrapType[] = JSON.parse(
		fs.readFileSync('./data/traps.json', 'utf-8'),
	);
	console.clear();

	let gameOver: boolean | undefined = false;
	let flee_state: boolean = false;

	while (!gameOver) {
		const player_remaining_hp_for_display: number = Math.round(
			(currentGameData.player.hp / currentGameData.player.max_hp) * 100,
		);
		const monster_remaining_hp_for_display: number = Math.round(
			(currentGameData.monsters[currentFloor][0].hp / gameData.monsters[currentFloor][0].hp) *
				100,
		);
		console.clear();

		// STATS DISPLAY
		glfunc.displayStats(currentFloor, currentGameData.floor, currentGameData.gamemode, currentGameData.difficulty);

		// LEVEL INFO
		glfunc.displayLevel(currentGameData.gamemode, currentGameData.player_lvl, currentGameData.player_exp);

		// HP BAR
		glfunc.displayHPBar({
			player_name: currentGameData.player.name,
			player_remaining_hp_for_display: player_remaining_hp_for_display,
			player_hp: currentGameData.player.hp,
			player_max_hp: currentGameData.player.max_hp,
			monster_name: currentGameData.monsters[currentFloor][0].name,
			monster_hp: currentGameData.monsters[currentFloor][0].hp,
			monster_max_hp: gameData.monsters[currentFloor][0].hp,
			monster_remaining_hp_for_display: monster_remaining_hp_for_display,
		});

		// BATTLE OPTION
		let returnState: [boolean, TurnType, boolean] = glfunc.displayBattlePhase({
			turn: turn,
			current_floor: currentFloor,
			monster_current_floor: currentGameData.monsters[currentFloor],
			playerObj: currentGameData.player,
			gamedata: currentGameData,
			originalgamedata: gameData,
			gamemode: gameData.gamemode,
		});

		flee_state = returnState[2];
		turn = returnState[1];
		gameOver = returnState[0];

		if (flee_state) {
			currentGameData.player.hp *= 0.1;
			currentFloor = 0;
			currentGameData.monsters = structuredClone(gameData.monsters);
			continue;
		}

		// LAST MESSAGE & LEVELING & SPECIAL ROOM
		let playerstats: number[] = glfunc.displayLastmessageLevelingSpecialRoom({
			monster_current_floor_length: currentGameData.monsters[currentFloor].length,
			current_floor: currentFloor,
			floor: currentGameData.floor,
			gamemode: currentGameData.gamemode,
			inventoryObj: currentGameData.inventory,
			player_exp: currentGameData.player_exp,
			player_lvl: currentGameData.player_lvl,
			playerObj: currentGameData.player,
			trapsObj: traps,
			gamedata: currentGameData,
		});
		currentFloor = playerstats[0]
		currentGameData.player_exp = playerstats[1],
		currentGameData.player_lvl = playerstats[2]
		if (currentGameData.player_exp >= 30) currentGameData.player_exp %= 30;
	}
}
export default runGame;
