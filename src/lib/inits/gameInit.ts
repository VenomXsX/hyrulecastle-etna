import { Char } from '~/types/type';
import * as rl from 'readline-sync';
import createChar from '~/lib/createChar';
import { DEFAULT_PLAYER } from './defaultInit';

function gameInit(mode: 'default' | 'enhanced') {
	const name: string = rl.question("What's your name: "); // TODO: change it with init
	const player: Char = !name
		? DEFAULT_PLAYER
		: createChar({ name, type: 'player', health: 60, atk: 15 });

	
}
export default gameInit;
