import Char from '~/types/type';

function createChar({ name, type, health, atk, def = 0 }: Char) {
	return {
		name,
		type,
		health,
		atk,
		def,
	};
}

export default createChar;
