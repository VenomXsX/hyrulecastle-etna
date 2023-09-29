import { SaveType, TurnType, Char } from '../types/type';
import color from '../utils/color';
import { sleep, press_to_continue, input } from '../utils/helper';

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
	} = structuredClone(gameData);
	let currentFloor: number = 0;
	let turn: TurnType = 'player';
	console.clear();

	while (true) {
		// STATS DISPLAY
		const player_remaining_hp_for_display: number = Math.round(
			(player.hp / player.max_hp) * 100,
		);
		const monster_remaining_hp_for_display: number = Math.round(
			(monsters[currentFloor][0].hp / gameData.monsters[currentFloor][0].hp) *
				100,
		);

		console.clear();
		console.log(
			`=== Current battle stats | Floor ${
				currentFloor + 1
			}/${floor} | Gamemode [${color(
				gamemode,
				'yellow',
			)}] | Difficulty [${color(difficulty, 'magenta')}] ===`,
		);

		if (gamemode === 'enhanced')
			console.log(
				`Your level: ${color(
					player_lvl.toString(),
					'white',
				)} [${player_exp}/30 EXP to next level]`,
			);

		console.log(`${color(player.name, 'green')}`);
		console.log(
			`HP : --==[${color(
				'♥'.repeat(player_remaining_hp_for_display),
				'green',
			)}${'♡'.repeat(100 - player_remaining_hp_for_display)}]==-- ${
				player.hp
			}/${player.max_hp}`,
		);

		// index 0 because there's only 1 monster per floor
		console.log(`${color(monsters[currentFloor][0].name, 'red')}`);
		console.log(
			`HP : --==[${color(
				'♥'.repeat(monster_remaining_hp_for_display),
				'red',
			)}${'♡'.repeat(100 - monster_remaining_hp_for_display)}]==-- ${
				monsters[currentFloor][0].hp
			}/${gameData.monsters[currentFloor][0].hp}`,
		);
		console.log('-'.repeat(121));
		console.log('');

		// BATTLE OPTION
		let playerOption: string = '';

		if (turn === 'player') {
			console.log('===== Options =====');
			console.log('1. Attack   | 2. Heal');

			// GET PLAYER OPTION
			while (!playerOption) {
				playerOption = input('What will you do?: ');
				if (!['1', '2'].includes(playerOption)) {
					playerOption = '';
					continue;
				}
				console.clear();

				// UPDATE DATA BASED ON PLAYEROPTION
				switch (playerOption) {
					case '1':
						// TODO: calculating player damage modifier & monster dmg mod
						let player_dmg: number = player.str;
						let crit: boolean = Math.random() <= 0.15;
						if (crit) player_dmg *= 2;
						player_dmg =
							player_dmg - (player_dmg * monsters[currentFloor][0].def) / 100; // using only physical def so no res
						player_dmg = Math.floor(player_dmg);
						if (crit) {
							console.log(`You landed a ${color('Critical Hit!', 'yellow')}`);
						}

						console.log(
							`You dealt ${color(
								player_dmg.toString(),
								'yellow',
							)} ATK to ${color(monsters[currentFloor][0].name, 'red')}.`,
						);
						monsters[currentFloor][0].hp -= player_dmg;
						break;
					case '2':
						const heal_amount: number = Math.round(player.max_hp / 2);
						if (player.hp === player.max_hp) {
							console.log(`You are already on ${color('max HP', 'cyan')}.`);
							continue;
						}
						const remaining_hp_for_healing = player.max_hp - player.hp;
						if (player.hp < Math.round(player.max_hp / 2)) {
							player.hp += heal_amount;
							console.log(
								`You chose to ${color('heal', 'white')}, you regain ${color(
									heal_amount.toString(),
									'green',
								)} HP.`,
							);
							break;
						} else {
							player.hp = player.max_hp;
							console.log(
								`You chose to ${color('heal', 'white')}, you regain ${color(
									remaining_hp_for_healing.toString(),
									'green',
								)} HP.`,
							);
							break;
						}
				}
			}
			if (monsters[currentFloor][0].hp <= 0) {
				turn = 'player';
			} else {
				turn = 'monster';
			}
			press_to_continue();
		} else {
			console.clear();
			console.log(
				`${color(
					monsters[currentFloor][0].name,
					'red',
				)} is thinking about his attack...`,
			);
			press_to_continue();

			let monster_dmg = monsters[currentFloor][0].str;
			let crit: boolean = Math.random() <= 0.15;
			if (crit) monster_dmg *= 2;
			monster_dmg = monster_dmg - (monster_dmg * player.def) / 100;
			monster_dmg = Math.floor(monster_dmg);

			player.hp -= monster_dmg;
			console.clear();

			if (crit) {
				console.log(
					`${color(monsters[currentFloor][0].name, 'red')} landed a ${color(
						'Critical Hit',
						'yellow',
					)} on you.`,
				);
			}
			console.log(
				`${color(
					monsters[currentFloor][0].name,
					'red',
				)} attacked you, you lost ${color(monster_dmg, 'yellow')} HP`,
			);
			turn = 'player';
			press_to_continue();
		}

		if (player.hp <= 0) {
			console.log(
				`\nYou died on ${color('floor ' + (currentFloor + 1), 'red')}`,
			);
			break;
		}

		if (monsters[currentFloor][0].hp <= 0) {
			console.clear();
			console.log(`${color(monsters[currentFloor][0].name, 'red')} died.`);
			monsters[currentFloor].shift();
			press_to_continue();
		}

		if (monsters[currentFloor].length === 0) {
			if (currentFloor === floor - 1) {
				console.log(color(`You defeated all the monsters, you won!`, 'green'));
				press_to_continue();
			}

			// TODO: PLAYER LEVEL MOD
			// if the defeated floor monster was a boss
			if (gamemode === 'enhanced') {
				if (currentFloor % 10 === 0 && currentFloor !== 0) {
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
					player = Object.keys(player).reduce(
						(acc: Partial<Char>, current): Partial<Char> => {
							if (
								[
									'hp',
									'mp',
									'str',
									'int',
									'def',
									'res',
									'spd',
									'luck',
								].includes(current)
							) {
								if (Math.floor(Math.random() * 2)) {
									player_stats_diff[current] += 2;
									return { ...player, [current]: (player[current] += 2) };
								}
							}
							return { ...acc, [current]: player[current] };
						},
						{},
					) as Char & { max_hp: number };
					//}
					for (const attr of Object.keys(player)) {
						if (
							['hp', 'mp', 'str', 'int', 'def', 'res', 'spd', 'luck'].includes(
								attr,
							)
						) {
							console.log(
								`${attr.toUpperCase()}: ${player[attr]} ${color(
									'+' + player_stats_diff[attr].toString(),
									player_stats_diff[attr] !== 0 ? 'white' : undefined,
								)}`,
							);
						}
					}
					press_to_continue();
				}
			}

			currentFloor += 1;
			console.log(
				`You defeated the current floor, you enter floor ${currentFloor + 1}`,
			);
		}
	}
}
export default runGame;
