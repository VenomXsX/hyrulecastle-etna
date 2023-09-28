import { input } from '../../utils/helper';
import color from '../../utils/color';

export default function chooseFloor() {
	while (true) {
		console.log(`=====[ ${color('Welcome to the Hyrule Castle', 'green')} ]======\n`)
		const floor = input('How many floors would you like to fight? (default 10, minimum 10): ');
		if (isNaN(Number(floor)) || Number(floor) < 10) {
			continue;
		}
		return Number(floor);
	}
}
