import { SaveType, TurnType } from '../types/type';
import color from '../utils/color';
import { sleep, press_to_continue, input } from '../utils/helper';

async function runGame(gameData: SaveType) {
	// clone the gamedata so that we can maybe add a save feature
	let { player, monsters, floor, gamemode } = JSON.parse(
		JSON.stringify(gameData),
	) as SaveType;
	let currentFloor: number = 0;
	let turn: TurnType = 'player';
	console.clear();

	while (true) {
		// TODO: STATS DISPLAY
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
			}/${floor} | Gamemode [${gamemode}] ===`,
		);
		console.log(`${color(player.name, 'green')}`);
		console.log(
			`HP : --==[${color(
				' '.repeat(player_remaining_hp_for_display),
				'green',
				'green',
			)}${'_'.repeat(100 - player_remaining_hp_for_display)}]==-- ${
				player.hp
			}/${player.max_hp}`,
		);
		// index 0 parce que c default sinon...
		console.log(`${color(monsters[currentFloor][0].name, 'red')}`);
		console.log(
			`HP : --==[${color(
				' '.repeat(monster_remaining_hp_for_display),
				'red',
				'red',
			)}${'_'.repeat(100 - monster_remaining_hp_for_display)}]==-- ${
				monsters[currentFloor][0].hp
			}/${gameData.monsters[currentFloor][0].hp}`,
		);
		console.log('-'.repeat(121));

		// TODO: BATTLE OPTION
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
						console.log(
							`You chose to ${color('attack', 'white')}, and dealt ${color(
								player.str.toString(),
								'yellow',
							)} ATK to ${color(monsters[currentFloor][0].name, 'red')}.`,
						);
						monsters[currentFloor][0].hp -= player.str;
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
			player.hp -= monsters[currentFloor][0].str;
			console.clear();
			console.log(
				`${color(
					monsters[currentFloor][0].name,
					'red',
				)} attacked you and you lost ${color(
					monsters[currentFloor][0].str.toString(),
					'yellow',
				)} HP.`,
			);
			turn = 'player';
			press_to_continue();
		}

		if (player.hp <= 0) {
			console.log(`\nYou died on ${color('floor ' + currentFloor, 'red')}`);
			break;
		}

		if (monsters[currentFloor][0].hp <= 0) {
			console.clear();
			console.log(`${color(monsters[currentFloor][0].name, 'red')} died.`)
			monsters[currentFloor].shift();
			press_to_continue();
		}

		if (monsters[currentFloor].length === 0) {
			if (currentFloor === floor - 1) {
				console.log(color(`You defeated all the monsters, you won!`, 'green'));
				break;
			}
			currentFloor += 1;
			console.log(
				`You defeated the current floor, you enter floor ${currentFloor + 1}`,
			);
		}
	}
}
export default runGame;
