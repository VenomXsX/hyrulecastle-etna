export const keyMap = {
	up: '1b5b41', // [ArrowUp]
	down: '1b5b42', // [ArrowDown]
	left: '1b5b44', // [ArrowLeft]
	right: '1b5b43', // [ArrowRight]
	enter: '0d', // [Enter]
	exit: '03', // [Ctrl + C]
	one: "31", // 1
	two: "32", // 2
	zero: "30", // 0
	'': '', // type error handle...
};

export type KeyMap = keyof typeof keyMap;
