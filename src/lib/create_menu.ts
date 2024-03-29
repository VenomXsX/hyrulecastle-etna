import { KeyMap, keyMap } from '../utils/keyMap';
import { handleEvent, sleep } from '../utils/helper';

const createMenu = async (
	func: Function,
	minMax: {
		min: number;
		max: number;
	},
) => {
	const eventRef = process.stdin;
	const maxTick = 15;
	let tick = 0;
	let printColor = true;
	let menuIndex: number = 1;
	let menuInput = '';

	eventRef.setRawMode(true);
	eventRef.resume();
	eventRef.on('data', (e) => {
		const key = e.toString('hex');
		// console.log(key);
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
			case keyMap.zero:
				menuInput = 'zero';
				break;
			case keyMap.one:
				menuInput = 'one';
				break;
			case keyMap.two:
				menuInput = 'two';
				break;
			case keyMap.three:
				menuInput = 'three';
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

		func(printColor, menuIndex);

		switch (menuInput as KeyMap) {
			case 'up':
				menuIndex = menuIndex - 1;
				if (menuIndex < minMax.min) menuIndex = minMax.max;
				break;
			case 'down':
				menuIndex = menuIndex + 1;
				if (menuIndex > minMax.max) menuIndex = minMax.min;
				break;
			case 'zero':
				handleEvent(eventRef, 'off');
				return 0;
			case 'one':
				handleEvent(eventRef, 'off');
				return 1;
			case 'two':
				handleEvent(eventRef, 'off');
				return 2;
			case 'three':
				handleEvent(eventRef, 'off');
				return 3;
			case 'enter':
				handleEvent(eventRef, 'off');
				return menuIndex;

			default:
				break;
		}

		// console.log(menuInput);
		tick++;

		menuInput = '';
		await sleep(maxTick);
	}
};

export default createMenu;
