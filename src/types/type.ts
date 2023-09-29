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
	id: number;
	name: string;
	description: string;
	effect: number;
	quantity: number;
	rarity: number;
};

type Gamemode = 'default' | 'enhanced';

type SaveType = {
	player: Char & { max_hp: number };
	floor: number;
	gamemode: Gamemode;
	monsters: MonsterAndFloor;
	inventory: Item[];
	difficulty: string;
	player_lvl: number;
	player_exp: number;
};

type TurnType = 'player' | 'monster';

type Difficulty = 'normal' | 'difficult' | 'insane';

export { Char, MonsterAndFloor, Gamemode, SaveType, TurnType, Difficulty };
