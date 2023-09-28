import gameInit from '../lib/inits/game_init';
import chooseGameMode from '../lib/choose_game_mode';
import runGame from '../lib/gameloop';
import { welcomeMessage } from '../lib/text/welcome_menu';

function main() {
	console.clear()
	welcomeMessage();
	// FIXME: [DEBUG]
	// console.log(gameInit(chooseGameMode()));
	
	runGame(gameInit(chooseGameMode()));
	return;
}
export default main;
