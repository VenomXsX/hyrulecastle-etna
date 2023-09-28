type Char = {
	[key: string]: any;
	id: number;
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

type Gamemode = 'default' | 'enhanced';

type SaveType = {
	player: Char & {max_hp: number};
	floor: number;
	gamemode: Gamemode;
	monsters: MonsterAndFloor;
	inventory: Item[];
	difficulty: string;
};

type TurnType = 'player' | 'monster';

export { Char, MonsterAndFloor, Gamemode, SaveType, TurnType };
