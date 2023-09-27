type Char = {
	name: string;
	hp: number;
	mp: number;
	str: number;
	int: number;
	def: number;
	res: number;
	spd: number;
	luck: number;
	race: number;
	class: number;
	rarity: number;
};

type MonsterAndFloor = Char[][];

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

export { Char, MonsterAndFloor, SaveType };
