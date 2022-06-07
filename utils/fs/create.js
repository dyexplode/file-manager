// import all module
import { access } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const create = async () => {
    // generate absolute path
    const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'files', 'fresh.txt');
    // check to exist path
    access(dir, (err) => {
        // if path is exist throw new error
        if (!err) {
            throw new Error('FS operation failed');
        }
        // create new file if path isn't exist
        writeFile(dir, 'I am fresh and young', { encoding: 'utf-8', });
    })
};

create();