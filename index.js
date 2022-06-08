import process, { stdin as input, stdout as output }from 'process';
import path from 'path';
import { createInterface } from 'readline';
import { parseArgs } from './utils/cli/parseArgs.js';
import { getEnv, setEnv } from './utils/cli/env.js';
import { homedir as getHomePath } from 'os';
import getList from './utils/fs/list.js';

// set default path
let currentPath = getHomePath();
currentPath = currentPath;
// save username in enveronment variable
let username = parseArgs().username;
if ( username ) {
    setEnv('RSS_FM_USERNAME', username);
} else {
    // if no send args of username
    setEnv('RSS_FM_USERNAME', 'user-default');
    console.log('username is set as default --> user-default');
};
const rl = createInterface({ input, output });

// Greeting!!!
rl.write(`Welcome to the File Manager, ${ getEnv('RSS_FM_USERNAME')}!\n`);
rl.write(`You are currently in ${currentPath}\n`);

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${ getEnv('RSS_FM_USERNAME') }!`);
});

rl.on('line', (line) => {
    let [command, ...argums] = line.split(' ');
    switch (command) {
        case '.exit':
            rl.close();
            break;

        case 'ls':
            getList(currentPath);
            break;

        case 'up':
            try {
                currentPath = path.join(currentPath, '..');
                console.log(currentPath);
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'cd':
            try {
                if (!argums[0]) throw new Error('Path is free');
                if (path.isAbsolute(argums[0])) {
                    currentPath = argums[0];
                    console.log(currentPath);
                } else {
                currentPath = path.join(currentPath, argums[0]);
                console.log(currentPath);
                }
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'cat':
            break;

        case 'add':
            break;

        case 'rn':
            break;

        case 'cp':
            break;

        case 'mv':
            break;

        case 'rm':
            break;

        case 'os':
            break;

        case 'hash':
            break;

        case 'compress':
            break;
        
        case 'decompress':
            break;


        default:
            rl.write('Invalid input\n');
    }
    
    if (command === '.exit') {
        rl.close();
    };
});
