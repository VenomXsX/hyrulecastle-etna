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

type Class = {
	id: number;
	name: string;
	strengths: number[];
	weaknesses: number[];
	attack_type: 'physical' | 'magical';
	alignment: 'good' | 'evil';
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

type Spell = {
	id: number;
	name: string;
	description: string;
	quantity: number;
	cost: number | string;
	dmg: number | string;
	effect: string;
	cooldown: number | string;
	race: string;
	class: string;
	rarity: number;
};

type Gamemode = 'default' | 'enhanced';

type SaveType = {
	player: Char & { max_hp: number };
	classes: Class[];
	spells: Spell[];
	floor: number;
	gamemode: Gamemode;
	monsters: MonsterAndFloor;
	inventory: Item[];
	difficulty: string;
	player_lvl: number;
	player_exp: number;
};

type TrapType = {
	id: number;
	name: string;
	requirement: string,
	rarity: number
}

type TurnType = 'player' | 'monster';

type Difficulty = 'normal' | 'difficult' | 'insane';

export {
	Char,
	Class,
	MonsterAndFloor,
	Gamemode,
	SaveType,
	TurnType,
	Difficulty,
	Item,
	Spell,
	TrapType,
};
