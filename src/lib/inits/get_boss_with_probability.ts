import { Char } from '../../types/type';

function getBossWithProbability(bosses: Char[]) {
	const highestRarity = bosses.reduce(
		(acc, item) => (acc < item.rarity ? item.rarity : acc),
		0,
	);
	let rarities: any[] = [];
	// create an array of probabilities
	for (let i = 0; i <= highestRarity; i++)
		for (let j = 0; j < i; j++) rarities.push(highestRarity - i + 1);

	const index = Math.floor(Math.random() * rarities.length);
	const filteredBosses = bosses.filter((x) => x.rarity === rarities[index]);
	return filteredBosses[Math.floor(Math.random() * filteredBosses.length)];
}

export default getBossWithProbability;