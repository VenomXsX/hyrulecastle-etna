import * as rl from 'readline-sync';

function promptName() {
    return rl.question("What's your name? ");
}
export default promptName;