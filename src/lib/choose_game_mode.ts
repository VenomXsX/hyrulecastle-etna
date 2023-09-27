import * as rl from 'readline-sync';

export default function chooseGameMode() {
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
			default:
				console.log('\nPlease try again.');
		}
	}

	return gamemode;
}
