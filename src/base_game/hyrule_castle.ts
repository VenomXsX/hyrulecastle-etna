import gameInit from '../lib/inits/game_init';
import runGame from '../lib/gameloop';
import { welcomeMessage } from '../lib/text/welcome_menu';
import { testLoop } from '../lib/text/test';
import createMenu from '../lib/create_menu';

async function main() {
	console.clear();

	while (true) {
		const menu = await createMenu(welcomeMessage, { min: 0, max: 2 });
		switch (menu) {
			case 0:
				process.exit(0);
			case 1:
				runGame(gameInit('default'));
				break;
			case 2:
				await testLoop();
			default:
				break;
		}
	}
}
export default main;
