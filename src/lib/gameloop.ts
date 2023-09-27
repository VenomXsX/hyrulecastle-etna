import { SaveType, TurnType } from '../types/type';
import * as rl from 'readline-sync';

function runGame(gameData: SaveType) {
	let currentGameData = { ...gameData };
	let floor: number = currentGameData.floor;
	let currentFloor: number = 0;
	let turn: TurnType = 'player';
	while (true) {
		if (currentGameData.player.hp < 0) {
			console.log(`You died!`);
			break;
		}
		if (currentGameData.monsters[currentFloor].length === 0) {
			if (currentFloor === floor - 1) {
				console.log(`You defeated all the monsters, you won!`);
				break;
			}
			console.log(
				`You defeated the current floor, you enter floor ${currentFloor + 1}`,
			);
			currentFloor += 1;
		}
		
        // stats display
        console.log('STATS');

        // battle options
        let playerOption: string = '';
        
        if (turn === 'player') {
            console.log('===== Options =====');
            console.log('1. Attack   | 2. Heal');
            
            // get player option
            while (true) {
                playerOption = rl.question('What will you do?: ')
                if (['1', '2'].includes(playerOption)) {
                    break;
                }
            }
            console.clear();
            console.log('You chose', playerOption);
        }
	}
}
export default runGame;