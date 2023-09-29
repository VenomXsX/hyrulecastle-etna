import color from '../../utils/color';
import createMenu from '../create_menu';

export const testLoop = async () => {
	while (true) {
		const menu2 = await createMenu(testMenu, { min: 0, max: 2 });
		switch (menu2) {
			case 0:
				return;
			case 1:
				console.log('You choose ' + menu2);
				break;

			default:
				break;
		}
	}
};

export const testMenu = (printColor: boolean, menuIndex: number) => {
	console.clear();
	console.log(`======[ ${color('New menu', 'green')} ]======\n`);
	console.log(`Select which game mode you want to play:\n`);
	console.log(
		color(
			`  1. Default mode.`,
			menuIndex === 1 ? (printColor ? 'magenta' : undefined) : undefined,
		),
	);
	console.log(
		color(
			`  2. Enhanced mode (player classes and randomized floors and monsters).`,
			menuIndex === 2 ? (printColor ? 'magenta' : undefined) : undefined,
		),
	);
	console.log(
		color(
			`\n  0. Return.\n`,
			menuIndex === 0 ? (printColor ? 'yellow' : undefined) : undefined,
		),
	);
};
