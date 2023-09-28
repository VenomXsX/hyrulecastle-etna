import color from '../../utils/color';

const welcomeMessage = () => {
	console.log(
		`======[ ${color('Welcome to the Hyrule Castle', 'green')} ]======\n`,
	);
	console.log(`Select which game mode you want to play:\n`);
	console.log(
		color(`  1. Default mode.`, 'white'),
	);
	console.log(
		color(`  2. Enhanced mode (player classes and randomized floors and monsters).`, 'cyan'),
	);
	console.log(color(`\n  0. Quit the game.\n`, 'red'));
};

export { welcomeMessage };
