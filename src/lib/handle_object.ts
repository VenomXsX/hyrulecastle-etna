export const searchObjById = <T>(obj: T[], id: number) =>
	obj.filter((item: any) => item.id === id)[0];

export const searchObjByName = <T>(obj: T[], name: string) =>
	obj.filter((item: any) => item.name === name)[0];
