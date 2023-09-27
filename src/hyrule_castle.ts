import * as fs from 'fs';
import * as rl from 'readline-sync';

import gameInit from '~/lib/inits/gameInit';
import { outputText } from './utils/helper';

function chooseGameMode() {
	let gamemode: string = '';
	while (!gamemode) {
		switch (rl.question('Which gamemode do you want to play? 0, 1 or 2: ')) {
			case '0':
				console.log('Exited');
				process.exit(0);
			case '1':
				gamemode = 'default';
				break;
			case '2':
				gamemode = 'enhanced';
				break;
		}
	}

	return gamemode;
}

function main() {
	outputText('./src/lib/text/welcomeMenu.txt');
	const gamemode = chooseGameMode();

	console.log(gamemode);

	// gameInit(); // selected mode

	return;
}
export default main;
