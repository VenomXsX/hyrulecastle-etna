import gameInit from '../lib/inits/game_init';
import runGame from '../lib/gameloop';
import { welcomeMessage } from '../lib/text/welcome_menu';
import { handleEvent, sleep } from '../utils/helper';

async function main() {
	const eventRef = process.stdin;
	console.clear();

	const keyMap = {
		up: '1b5b41', // [ArrowUp]
		down: '1b5b42', // [ArrowDown]
		left: '1b5b44', // [ArrowLeft]
		right: '1b5b43', // [ArrowRight]
		enter: '0d', // [Enter]
		exit: '03', // [Ctrl + C]
		'': '', // type error handle...
	};

	const maxTick = 15;
	let tick = 0;
	let printColor = true;
	let menuInput: keyof typeof keyMap = '';
	const menus = {
		welcomeMenu: 1,
	};

	eventRef.setRawMode(true);
	eventRef.resume();
	eventRef.on('data', (e) => {
		const key = e.toString('hex');
		console.log(key);
		switch (key) {
			case keyMap.exit:
				process.exit(0);
			case keyMap.up:
				menuInput = 'up';
				break;
			case keyMap.down:
				menuInput = 'down';
				break;
			case keyMap.left:
				menuInput = 'left';
				break;
			case keyMap.right:
				menuInput = 'right';
				break;
			case keyMap.enter:
				menuInput = 'enter';
				break;
			default:
		}
	});

	while (true) {
		console.clear();
		if (tick === maxTick) {
			printColor = !printColor;
			tick = 0;
		}

		const welcomeReturn = welcomeMessage(printColor, menus, menuInput);
		if (welcomeReturn) {
			handleEvent(eventRef, 'off');
			switch (menus.welcomeMenu) {
				case 0:
					process.exit(0);
				case 1:
					runGame(gameInit('default'));
				case 2:
					runGame(gameInit('enhanced'));

				default:
					break;
			}
			handleEvent(eventRef, 'on');
		}
		console.log(menuInput);
		tick++;

		menuInput = '';
		await sleep(maxTick);
	}
}
export default main;
