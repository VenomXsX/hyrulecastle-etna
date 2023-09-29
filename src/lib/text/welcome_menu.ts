import color from '../../utils/color';

const welcomeMessage = (printColor: boolean, menus: any, menuInput: any) => {
	let returnValue = false;
	switch (menuInput) {
		case 'up':
			menus.welcomeMenu = menus.welcomeMenu - 1;
			if (menus.welcomeMenu < 0) menus.welcomeMenu = 2;
			break;
		case 'down':
			menus.welcomeMenu = menus.welcomeMenu + 1;
			if (menus.welcomeMenu > 2) menus.welcomeMenu = 0;
			break;
		case 'enter':
			returnValue = true;
			break;

		default:
			break;
	}
	console.log(
		`======[ ${color('Welcome to the Hyrule Castle', 'green')} ]======\n`,
	);
	console.log(`Select which game mode you want to play:\n`);
	console.log(
		color(
			`  1. Default mode.`,
			menus.welcomeMenu === 1 ? (printColor ? 'cyan' : undefined) : undefined,
		),
	);
	console.log(
		color(
			`  2. Enhanced mode (player classes and randomized floors and monsters).`,
			menus.welcomeMenu === 2 ? (printColor ? 'cyan' : undefined) : undefined,
		),
	);
	console.log(
		color(
			`\n  0. Quit the game.\n`,
			menus.welcomeMenu === 0 ? (printColor ? 'red' : undefined) : undefined,
		),
	);
	return returnValue;
};

export { welcomeMessage };
