import * as rl from 'readline-sync';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const press_to_continue = () => rl.question('\n\nPress any key to continue...');


export { sleep, press_to_continue };