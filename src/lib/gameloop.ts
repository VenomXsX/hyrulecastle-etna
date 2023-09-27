import { SaveType, TurnType } from '../types/type';
import * as rl from 'readline-sync';
import color from '../utils/color';
import { sleep, press_to_continue } from '../utils/helper';

async function runGame(gameData: SaveType) {
	// clone the gamedata so that we can maybe add a save feature
	let { player, monsters, floor } = JSON.parse(
		JSON.stringify(gameData),
	) as SaveType;
	let currentFloor: number = 0;
	let turn: TurnType = 'player';
	console.clear();

	while (true) {
		if (player.hp <= 0) {
			console.log(`You died!`);
			break;
		}

		// TODO: REMOVE DEFEATED MONSTER FROM OBJECT
		if (monsters[currentFloor][0].hp <= 0) {
			monsters[currentFloor].shift();
		}

		if (monsters[currentFloor].length === 0) {
			if (currentFloor === floor - 1) {
				console.log(`You defeated all the monsters, you won!`);
				break;
			}
			currentFloor += 1;
			console.log(
				`You defeated the current floor, you enter floor ${currentFloor + 1}`,
			);
		}

		// TODO: STATS DISPLAY
		console.clear();
		console.log(`=== Current battle stats | Floor ${currentFloor + 1} ===`);
		console.log(`${color(player.name, 'green')}`);
		console.log(
			`HP : [${color(' '.repeat(player.hp), 'green', 'green')}${' '.repeat(
				player.max_hp - player.hp,
			)}] ${player.hp}/${player.max_hp}`,
		);
		// index 0 parce que c default sinon...
		console.log(`${color(monsters[currentFloor][0].name, 'red')}`);
		console.log(
			`HP : [${color(
				' '.repeat(monsters[currentFloor][0].hp),
				'red',
				'red',
			)}${' '.repeat(
				gameData.monsters[currentFloor][0].hp - monsters[currentFloor][0].hp,
			)}] ${monsters[currentFloor][0].hp}/${
				gameData.monsters[currentFloor][0].hp
			}`,
		);
		console.log('-'.repeat(60));

		// TODO: BATTLE OPTION
		let playerOption: string = '';

		if (turn === 'player') {
			console.log('===== Options =====');
			console.log('1. Attack   | 2. Heal');

			// GET PLAYER OPTION
			while (!playerOption) {
				playerOption = rl.question('What will you do?: ');
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
						const remaining_hp = player.max_hp - player.hp;
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
									remaining_hp.toString(),
									'green',
								)} HP.`,
							);
							break;
						}
				}
			}
			turn = 'monster';
			press_to_continue();
		} else {
			console.clear();
			console.log(
				`${color(
					monsters[currentFloor][0].name,
					'red',
				)} is thinking about his attack.`,
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
	}
}
export default runGame;
