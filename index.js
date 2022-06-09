import { stdin as input, stdout as output }from 'process';
import { createInterface } from 'readline';
import { parseArgs } from './utils/cli/parseArgs.js';
import { getEnv, setEnv } from './utils/cli/env.js';
import { homedir as getHomePath } from 'os';

import getList from './utils/fs/list.js';
import renameFile from './utils/fs/rename.js';
import copyFile from './utils/fs/copy.js';
import removeFile from './utils/fs/delete.js';
import readFile from './utils/streams/read.js';
import createFile from './utils/streams/write.js';
import checkPath from './utils/checkPath.js';
import calcHash from './utils/calcHash.js';
import getOs from './utils/os.js';
import { compress as compressFile, decompress as decompressFile } from './utils/zip.js';

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
    console.log(`Thank you for using File Manager, ${ getEnv('RSS_FM_USERNAME') }!\n`);
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
                currentPath = checkPath('..', currentPath);
                console.log('Current path:', currentPath);
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'cd':
            try {
                if (!argums[0]) throw new Error('Path is empty');
                currentPath = checkPath(argums[0], currentPath);
                console.log('Current path:', currentPath);
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'cat':
            try {
                if (!argums[0]) throw new Error('Path is empty');
                readFile(checkPath(argums[0], currentPath));
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'add':
            try {
                if (!argums[0]) throw new Error('Path is empty');
                createFile(checkPath(argums[0], currentPath));
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'rn':
            try {
                if (!argums[0] || !argums[1]) throw new Error('Path is empty');
                renameFile(checkPath(argums[0], currentPath), checkPath(argums[1], currentPath));
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'cp':
            try {
                if (!argums[0] || !argums[1]) throw new Error('Path is empty');
                copyFile(checkPath(argums[0], currentPath), checkPath(argums[1], currentPath));
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'mv':
            try {
                if (!argums[0] || !argums[1]) throw new Error('Path is empty');
                copyFile(checkPath(argums[0], currentPath), checkPath(argums[1], currentPath))
                .then(
                    () => removeFile(checkPath(argums[0], currentPath))
                );
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'rm':
            try {
                if (!argums[0]) throw new Error('Path is empty');
                removeFile(checkPath(argums[0], currentPath));
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'os':
            try {
                if (!argums[0]) throw new Error('Path is empty');
                getOs(argums[0]);
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'hash':
            try {
                if (!argums[0]) throw new Error('Path is empty');
                calcHash(checkPath(argums[0], currentPath)).then((result => console.log(result)));
            } catch (err) {
                console.log('Operation failed');
            }
            break;

        case 'compress':
            try {
                if (!argums[0] || !argums[1]) throw new Error('Path is empty');
                compressFile(checkPath(argums[0], currentPath), checkPath(argums[1], currentPath));
            } catch (err) {
                console.log('Operation failed');
            }
            break;
        
        case 'decompress':
            try {
                if (!argums[0] || !argums[1]) throw new Error('Path is empty');
                decompressFile(checkPath(argums[0], currentPath), checkPath(argums[1], currentPath));
            } catch (err) {
                console.log('Operation failed');
            }
            break;


        default:
            console.log('Invalid input\n');
            break;
    }
    
    if (command === '.exit') {
        rl.close();
    };
});
