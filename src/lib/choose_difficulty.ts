import { Difficulty } from '../types/type';
import color from '../utils/color';
import { input } from '../utils/helper';

function chooseDifficulty(): Difficulty {
	console.clear();
	let chosen_difficulty: Difficulty = 'normal';
	console.log(
		`======[ ${color('Welcome to the Hyrule Castle', 'green')} ]======\n`,
	);
	console.log(
		`   1. Normal (default). Monsters multiplier ${color('x1.0', 'white')}`,
	);
	console.log(
		`   2. Difficult. Monsters multiplier ${color('x1.5', 'yellow')}`,
	);
	console.log(`   3. Insane. Monsters multiplier ${color('x2.0', 'red')}`);
	console.log('');

	const valid_options: Difficulty[] = ['normal', 'difficult', 'insane'];
	while (true) {
		let userInput = input(
			'Which diffculty do you want to play at? ',
		).toLowerCase() as Difficulty;
		if (isNaN(Number(userInput))) {
			if (valid_options.includes(userInput)) break;
		}
		if ([1, 2, 3].includes(Number(userInput))) {
			chosen_difficulty = valid_options[Number(userInput) - 1];
			break;
		}
	}
	return chosen_difficulty;
}
export default chooseDifficulty;
