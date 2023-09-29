import color from '../../utils/color';

const welcomeMessage = (printColor: boolean, menuIndex: number) => {
	console.log(
		`======[ ${color('Welcome to the Hyrule Castle', 'green')} ]======\n`,
	);
	console.log(`Select which game mode you want to play:\n`);
	console.log(
		color(
			`  1. Default mode.`,
			menuIndex === 1 ? (printColor ? 'cyan' : undefined) : undefined,
		),
	);
	console.log(
		color(
			`  2. Enhanced mode (player classes and randomized floors and monsters).`,
			menuIndex === 2 ? (printColor ? 'cyan' : undefined) : undefined,
		),
	);
	console.log(
		color(
			`\n  0. Quit the game.\n`,
			menuIndex === 0 ? (printColor ? 'red' : undefined) : undefined,
		),
	);
};

export { welcomeMessage };
