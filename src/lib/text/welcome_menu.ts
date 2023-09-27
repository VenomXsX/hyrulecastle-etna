import color from '../../utils/color';

const welcomeMessage = () => {
	console.log(
		`======[ ${color('Welcome to the Hyrule Castle', 'green')} ]======\n`,
	);
	console.log(`Select which game mode you want to play:\n`);
	console.log(
		`  1. Default mode. (which you play Link and defeat all Bokoblins)`,
	);
	console.log(
		`  2. Enhanced mode (player classes and randomized floors and monsters).`,
	);
	console.log(`\n  0. Quit the game.\n`);
};

export { welcomeMessage };
