type Color = 'blue' | 'red' | 'yellow' | 'green' | 'magenta' | 'cyan' | 'white';

const backgound = (message: string, backgound?: Color) => {
	switch (backgound) {
		case 'red':
			return `\x1b[1;41m${message}\x1b[0m`;
		case 'green':
			return `\x1b[1;42m${message}\x1b[0m`;
		case 'yellow':
			return `\x1b[1;43m${message}\x1b[0m`;
		case 'blue':
			return `\x1b[1;44m${message}\x1b[0m`;
		case 'magenta':
			return `\x1b[1;45m${message}\x1b[0m`;
		case 'cyan':
			return `\x1b[1;46m${message}\x1b[0m`;
		case 'white':
			return `\x1b[1;47m${message}\x1b[0m`;
		default:
			return message;
	}
};

/**
 * ## List of colors
 * ```ts
 * 'blue' | 'red' | 'yellow' | 'green' | 'magenta' | 'cyan' | 'white'
 * ```
 * @param message The message
 * @param color The **foreground** color `default: neutral`
 * @param backgound The **background** color `default: neutral`
 * @returns Return a formated string with color
 */
const color = (
	message: string,
	foregroundColor?: Color,
	backgroundColor?: Color,
) => {
	switch (foregroundColor) {
		case 'red':
			return `\x1b[1;31m${backgound(message, backgroundColor)}\x1b[0m`;
		case 'green':
			return `\x1b[1;32m${backgound(message, backgroundColor)}\x1b[0m`;
		case 'yellow':
			return `\x1b[1;33m${backgound(message, backgroundColor)}\x1b[0m`;
		case 'blue':
			return `\x1b[1;34m${backgound(message, backgroundColor)}\x1b[0m`;
		case 'magenta':
			return `\x1b[1;35m${backgound(message, backgroundColor)}\x1b[0m`;
		case 'cyan':
			return `\x1b[1;36m${backgound(message, backgroundColor)}\x1b[0m`;
		case 'white':
			return `\x1b[1;37m${backgound(message, backgroundColor)}\x1b[0m`;
		default:
			return message;
	}
};

export default color;
