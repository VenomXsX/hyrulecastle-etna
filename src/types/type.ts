type Char = {
	name: string;
	type: 'player' | 'monster';
	health: number;
	atk: number;
	def?: number;
};

type MonsterAndFloor = {
	[key: string]: Char[];
};

type Item = {
	name: string;
	description: string;
	effect: number;
};

type SaveType = {
	player: Char;
	floor: number;
	monsters: MonsterAndFloor;
	inventory: Item[];
};

export { Char, SaveType };
