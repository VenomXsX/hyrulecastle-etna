import { Item } from '../types/type';

export const searchObjById = <T>(obj: T[], id: number) =>
	obj.filter((item: any) => item.id === id)[0];

export const searchObjByName = <T>(obj: T[], name: string) =>
	obj.filter((item: any) => item.name === name)[0];

export const handleQuantity = (
	obj: Item[],
	id: number,
	option: 'add' | 'remove',
	value: number,
) => {
	switch (option) {
		case 'add':
			searchObjById(obj, id).quantity += value;
			break;
		case 'remove':
			searchObjById(obj, id).quantity -= searchObjById(obj, id).quantity > 0 ? value : 0;
			break;
	}
};
