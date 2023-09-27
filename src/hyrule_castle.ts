import gameInit from './lib/inits/game_init';
import chooseGameMode from './lib/choose_game_mode';
import runGame from './lib/gameloop';
import { welcomeMessage } from './lib/text/welcome_menu';

function main() {
	welcomeMessage();
	runGame(gameInit(chooseGameMode()));
	return;
}
export default main;
