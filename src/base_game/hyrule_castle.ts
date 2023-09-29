import gameInit from '../lib/inits/game_init';
import runGame from '../lib/gameloop';
import { welcomeMessage } from '../lib/text/welcome_menu';
import createMenu from '../lib/create_menu';
import * as fs from 'fs';

async function main() {
	console.clear();

	while (true) {
		const menuInput = await createMenu(welcomeMessage, { min: 0, max: 3 });
		
		switch (menuInput) {
			case 0:
				process.exit(0);
			case 1:
				runGame(gameInit('default'));
				break;
			case 2:
				runGame(gameInit('enhanced'));
				break;
			case 3:
				runGame(JSON.parse(fs.readFileSync('./.savegame.json', 'utf-8')));
			default:
				break;
		}
	}
}
export default main;
