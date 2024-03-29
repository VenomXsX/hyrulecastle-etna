import { Char } from '../../types/type';

function getEntitiesByRarity<T>(mob: T[]) {
	const highestRarity = mob.reduce(
		(acc, item: any) => (acc < item.rarity ? item.rarity : acc),
		0,
	);
	let rarities: any[] = [];
	// create an array of probabilities
	for (let i = 0; i <= highestRarity; i++)
		for (let j = 0; j < i; j++) rarities.push(highestRarity - i + 1);

	const index = Math.floor(Math.random() * rarities.length);
	const filteredMob = mob.filter((x: any) => x.rarity === rarities[index]);
	return filteredMob[Math.floor(Math.random() * filteredMob.length)];
}

export default getEntitiesByRarity;