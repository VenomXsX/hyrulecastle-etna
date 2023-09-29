import color from '../utils/color';
import {
	Gamemode,
	Char,
	TrapType,
	Item,
	TurnType,
	MonsterAndFloor,
	SaveType,
} from '../types/type';
import {
	press_to_continue,
	input,
	randomIntFromInterval,
} from '../utils/helper';
import getEntitiesByRarity from '../lib/inits/get_entities_by_rarity';
import { handleQuantity } from '../lib/handle_object';
import * as fs from 'fs';

function displayStats(
	currentFloor: number,
	floor: number,
	gamemode: Gamemode,
	difficulty: string,
) {
	console.log(
		`=== Current battle stats | Floor ${
			currentFloor + 1
		}/${floor} | Gamemode [${color(gamemode, 'yellow')}] | Difficulty [${color(
			difficulty,
			'magenta',
		)}] ===`,
	);
}

function displayLevel(
	gamemode: Gamemode,
	player_lvl: number,
	player_exp: number,
) {
	if (gamemode === 'enhanced')
		console.log(
			`Your level: ${color(
				player_lvl.toString(),
				'white',
			)} [${player_exp}/30 EXP to next level]`,
		);
}
function displayHPBar({
	player_name,
	player_remaining_hp_for_display,
	player_hp,
	player_max_hp,
	monster_name,
	monster_remaining_hp_for_display,
	monster_hp,
	monster_max_hp,
}: {
	player_name: string;
	player_remaining_hp_for_display: number;
	player_hp: number;
	player_max_hp: number;
	monster_name: string;
	monster_remaining_hp_for_display: number;
	monster_hp: number;
	monster_max_hp: number;
}) {
	console.log(`${color(player_name, 'green')}`);
	console.log(
		`HP : --==[${color(
			'♥'.repeat(player_remaining_hp_for_display),
			'green',
		)}${'♡'.repeat(
			100 - player_remaining_hp_for_display,
		)}]==-- ${player_hp}/${player_max_hp}`,
	);

	console.log(`${color(monster_name, 'red')}`);
	console.log(
		`HP : --==[${color(
			'♥'.repeat(monster_remaining_hp_for_display),
			'red',
		)}${'♡'.repeat(
			100 - monster_remaining_hp_for_display,
		)}]==-- ${monster_hp}/${monster_max_hp}`,
	);
	console.log('-'.repeat(121));
	console.log('');
}

function displayBattlePhase({
	turn,
	playerObj,
	monster_current_floor,
	current_floor,
	gamedata,
	originalgamedata,
	gamemode,
}: {
	turn: TurnType;
	playerObj: Char;
	monster_current_floor: Char[];
	current_floor: number;
	gamedata: SaveType,
	originalgamedata: SaveType,
	gamemode: Gamemode
}): [boolean, TurnType] {
	let playerOption: string = '';
	
	let protected_state: boolean = false;
	let flee_state: boolean = false;
	if (turn === 'player') {
		console.log('===== Options =====');
		if(gamemode === 'enhanced') {
			console.log('1. Attack   | 2. Heal   | 3. Protect   | 4. Flee the tower   | 5. Save and quit');
		} else {
			console.log('1. Attack   | 2. Heal   | 3. Save and quit');
		}

		// GET PLAYER OPTION
		while (!playerOption) {
			playerOption = input('What will you do?: ');
			if (!['1', '2', '3', '4', '5'].includes(playerOption) && gamemode === 'enhanced') {
				playerOption = '';
				continue;
			}
			if (!['1', '2', '3'].includes(playerOption) && gamemode === 'default') {
				playerOption = '';
				continue;
			}
			console.clear();

			// UPDATE DATA BASED ON PLAYEROPTION
			switch (playerOption) {
				case '1':
					// TODO: calculating player damage modifier & monster dmg mod
					let player_dmg: number = playerObj.str;
					let crit: boolean = Math.random() <= playerObj.luck / 100;
					if (crit) player_dmg *= 2;
					player_dmg =
						player_dmg - (player_dmg * monster_current_floor[0].def) / 100; // using only physical def so no res
					player_dmg = Math.floor(player_dmg);
					if (crit) {
						console.log(`You landed a ${color('Critical Hit!', 'yellow')}`);
					}

					console.log(
						`You dealt ${color(player_dmg.toString(), 'yellow')} ATK to ${color(
							monster_current_floor[0].name,
							'red',
						)}.`,
					);
					monster_current_floor[0].hp -= player_dmg;
					break;
				case '2':
					const heal_amount: number = Math.round(playerObj.max_hp / 2);
					if (playerObj.hp === playerObj.max_hp) {
						console.log(`You are already on ${color('max HP', 'cyan')}.`);
						continue;
					}
					const remaining_hp_for_healing = playerObj.max_hp - playerObj.hp;
					if (playerObj.hp < Math.round(playerObj.max_hp / 2)) {
						playerObj.hp += heal_amount;
						console.log(
							`You chose to ${color('heal', 'white')}, you regain ${color(
								heal_amount.toString(),
								'green',
							)} HP.`,
						);
						break;
					} else {
						playerObj.hp = playerObj.max_hp;
						console.log(
							`You chose to ${color('heal', 'white')}, you regain ${color(
								remaining_hp_for_healing.toString(),
								'green',
							)} HP.`,
						);
						break;
					}
				case '3':
					if(gamemode === 'enhanced') {
						protected_state = true;
						console.log(`You chose to brace yourself for the next attack, you only receive ${color('half', 'green')} the damage`);
						break;
					}
					console.clear();
					console.log('Saving...');
					fs.writeFileSync('./.savegame.json', JSON.stringify(gamedata, null, 2));
					console.log('Saved');
					process.exit(0);
				case '4':
					if (gamemode === 'enhanced') {
						console.log(`You decided to flee the tower, you will start again with some ${color('penalties', 'red')}...`);
						flee_state = true;
						gamedata = originalgamedata;
						gamedata.player.hp *= 0.1;
						break;
					}
					continue;
				case '5':
					if (gamemode === 'enhanced') {
						const SaveGameFile: SaveType = structuredClone(gamedata);
						console.clear();
						console.log('Saving...');
						fs.writeFileSync('./.savegame.json', JSON.stringify(gamedata, null, 2));
						console.log('Saved');
						process.exit(0);
					}
					continue;
			}
		}
		if (monster_current_floor[0].hp <= 0 || flee_state) {
			turn = 'player';
		} else {
			turn = 'monster';
		}
		press_to_continue();
	} else {
		console.clear();
		console.log(
			`${color(
				monster_current_floor[0].name,
				'red',
			)} is thinking about his attack...`,
		);
		press_to_continue();

		let monster_dmg = monster_current_floor[0].str;
		let crit: boolean = Math.random() <= monster_current_floor[0].luck / 100;
		if (crit) monster_dmg *= 2;
		monster_dmg = monster_dmg - (monster_dmg * playerObj.def) / 100;
		monster_dmg = Math.floor(monster_dmg);
		if (protected_state) {
			monster_dmg *= 0.5;
		}

		playerObj.hp -= monster_dmg;
		console.clear();

		if (crit) {
			console.log(
				`${color(monster_current_floor[0].name, 'red')} landed a ${color(
					'Critical Hit',
					'yellow',
				)} on you.`,
			);
		}
		console.log(
			`${color(
				monster_current_floor[0].name,
				'red',
			)} attacked you, you lost ${color(monster_dmg, 'yellow')} HP`,
		);
		turn = 'player';
		press_to_continue();
	}

	if (playerObj.hp <= 0) {
		console.log(
			`\nYou died on ${color('floor ' + (current_floor + 1), 'red')}`,
		);
        press_to_continue();
		return [true, turn];
	}

	if (monster_current_floor[0].hp <= 0) {
		console.clear();
		console.log(`${color(monster_current_floor[0].name, 'red')} died.`);
		monster_current_floor.shift();
		press_to_continue();
	}
	return [false, turn];
}

function displayLastmessageLevelingSpecialRoom({
	monster_current_floor_length,
	current_floor,
	floor,
	gamemode,
	player_exp,
	player_lvl,
	playerObj,
	trapsObj,
	inventoryObj,
	gamedata,
}: {
	monster_current_floor_length: number;
	current_floor: number;
	floor: number;
	gamemode: Gamemode;
	player_exp: number;
	player_lvl: number;
	playerObj: Char;
	trapsObj: TrapType[];
	inventoryObj: Item[];
	gamedata: SaveType;
}): number[] {
	if (monster_current_floor_length === 0) {
		if (current_floor === floor - 1) {
			console.log(color(`You defeated all the monsters, you won!`, 'green'));
			press_to_continue();
		}

		// if the defeated floor monster was a boss
		if (gamemode === 'enhanced') {
			if (current_floor % 10 === 0 && current_floor !== 0) {
				console.clear();
				console.log(`You gained ${color('10', 'green')} EXP!`);
				player_exp += 10;
				press_to_continue();
			} else {
				console.clear();
				console.log(`You gained ${color('5', 'green')} EXP!`);
				player_exp += 5;
				press_to_continue();
			}

			// check leveling
			const current_lvl: number = player_lvl;
			const lvl_after_exp_add: number = (player_lvl += Math.floor(
				player_exp / 30,
			));
			console.log('');
			if (current_lvl < lvl_after_exp_add) {
				player_lvl = lvl_after_exp_add;
				console.log(
					`Congratulations you gained a level, you are now level ${color(
						player_lvl,
						'white',
					)}`,
				);
				const player_stats_diff: {
					[key: string]: number;
				} = {
					hp: 0,
					mp: 0,
					str: 0,
					int: 0,
					def: 0,
					res: 0,
					spd: 0,
					luck: 0,
				};
				//for (let i = 0; i < 4; i += 1) {
				playerObj = Object.keys(playerObj).reduce(
					(acc: Partial<Char>, current): Partial<Char> => {
						if (
							['hp', 'mp', 'str', 'int', 'def', 'res', 'spd', 'luck'].includes(
								current,
							)
						) {
							if (Math.floor(Math.random() * 2)) {
								player_stats_diff[current] += 2;
								return { ...playerObj, [current]: (playerObj[current] += 2) };
							}
						}
						return { ...acc, [current]: playerObj[current] };
					},
					{},
				) as Char & { max_hp: number };
				//}
				for (const attr of Object.keys(playerObj)) {
					if (
						['hp', 'mp', 'str', 'int', 'def', 'res', 'spd', 'luck'].includes(
							attr,
						)
					) {
						console.log(
							`${attr.toUpperCase()}: ${playerObj[attr]} ${color(
								'+' + player_stats_diff[attr].toString(),
								player_stats_diff[attr] !== 0 ? 'white' : undefined,
							)}`,
						);
					}
				}
				press_to_continue();
			}
		}

		// SPECIAL ROOM
		if (gamemode === 'enhanced') {
			let special_room_state: boolean = Math.random() <= 0.35;
			if (current_floor + (1 % 10) === 0) {
				// IF NEXT FLOOR IS BOSS ROOM
				special_room_state = true;
			}
			if (special_room_state) {
				console.clear();
				console.log(color(`==== You've stumbled upon a room... ====`, 'white'));
				let roomtype: boolean = Math.random() < 0.9; // true = trap ; false = treasure
				let room_requirements_state: boolean = false; // if player meets room requirement
				if (roomtype) {
					console.log(color('Trap Room', 'yellow'));
					const trap: TrapType = getEntitiesByRarity(trapsObj);

					// check if requirements are met
					let room_requirements: string[] = trap.requirement.split('_');
					room_requirements[0].toLowerCase();
					if (playerObj[room_requirements[0]] >= Number(room_requirements[1]))
						room_requirements_state = true;
				} else {
					room_requirements_state = true;
					console.log(color('Treasure Room', 'yellow'));
				}
				room_requirements_state
					? console.log('You meet the requirements to leave this room.')
					: console.log('You do not meet the requirements to leave this room.');
				console.log('=== Options ===');
				room_requirements_state
					? console.log('1. Leave')
					: console.log('1. Leave (you will be penalized)');
				console.log('');
				let userInput: string = '';
				while (!userInput) {
					userInput = input('What do you want to do? ');
					if (['1', 'leave'].includes(userInput.toLowerCase())) {
						if (!roomtype) {
							// if treasure room
							const coins_gained: number = randomIntFromInterval(3, 5);
							console.log(
								`You left the room with ${color(
									coins_gained + ' coins',
									'yellow',
								)}`,
							);
							handleQuantity(inventoryObj, 1, 'add', coins_gained);
							press_to_continue();
							break;
						}
						if (roomtype && room_requirements_state) {
							// if trap room and requirements met
							break;
						}
						if (roomtype && !room_requirements_state) {
							// if trap room and requirements not met
							const percentage_lost: number =
								randomIntFromInterval(5, 15) / 100;
							const hp_lost: number = Math.floor(
								playerObj.max_hp * percentage_lost,
							);
							console.log(`You ${color('lost', 'red')} ${hp_lost} HP...`);
							console.log('');
							press_to_continue();
							break;
						}
					}
				}
			}
		}

		console.log(
			`You defeated the current floor, you enter floor ${current_floor + 2}`,
		);
		press_to_continue();
		return [(gamedata.current_floor += 1), player_exp, player_lvl];
	}
	return [gamedata.current_floor, player_exp, player_lvl];
}

export {
	displayStats,
	displayLevel,
	displayHPBar,
	displayLastmessageLevelingSpecialRoom,
	displayBattlePhase,
};
