import gameInit from './lib/inits/game_init';
import { outputText } from './utils/helper';
import chooseGameMode from './lib/choose_game_mode';
import runGame from './lib/gameloop';

function main() {
	outputText('./src/lib/text/welcome_menu.txt');
	runGame(gameInit(chooseGameMode()));
	return;
}
export default main;
