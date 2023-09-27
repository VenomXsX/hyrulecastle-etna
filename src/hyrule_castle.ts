import gameInit from '~/lib/inits/gameInit';
import { outputText } from './utils/helper';
import chooseGameMode from './lib/chooseGameMode';

function main() {
	outputText('./src/lib/text/welcomeMenu.txt');
	const gamemode = chooseGameMode();

	console.log(gamemode);

	// gameInit(); // selected mode

	return;
}
export default main;
