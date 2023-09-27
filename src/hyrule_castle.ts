import gameInit from '~/lib/inits/game_init';
import { outputText } from './utils/helper';
import chooseGameMode from './lib/choose_game_mode';

function main() {
	outputText('./src/lib/text/welcome_menu.txt');
	const gamemode = chooseGameMode();
	

	return;
}
export default main;
