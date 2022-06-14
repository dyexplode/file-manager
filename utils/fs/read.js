import { join, dirname } from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

export const read = async () => {
    let content;
    const currDir = dirname(fileURLToPath(import.meta.url));
    try{
        content = await readFile(join(currDir, 'files', 'fileToRead.txt'), { encoding: 'utf-8' });
        console.log(content);
    } catch {
        throw new Error('FS operation failed');
    }
};

read();