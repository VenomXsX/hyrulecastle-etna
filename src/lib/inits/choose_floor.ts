import { input } from '../../utils/helper';

export default function chooseFloor() {
	while (true) {
		const floor = input('How many floors would you like to fight? (default 10, minimum 10):');

		if (isNaN(Number(floor))) {}
	}

	return 11;
}
