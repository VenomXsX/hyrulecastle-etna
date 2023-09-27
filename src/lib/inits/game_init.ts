import { Char } from '~/types/type';
import * as rl from 'readline-sync';
import createChar from '~/lib/create_char';
import { DEFAULT_PLAYER } from './default_init';

function gameInit(mode: 'default' | 'enhanced') {
	const name: string = rl.question("What's your name: ");
	const player: Char = !name
		? DEFAULT_PLAYER
		: createChar({ name, type: 'player', health: 60, atk: 15 });

	
}
export default gameInit;
