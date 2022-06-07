import { stdin } from 'process';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const write = async () => {
    const currDir = path.dirname(fileURLToPath(import.meta.url));
    const writer = createWriteStream(path.join(currDir, 'files', 'fileToWrite.txt'), { encoding: 'utf-8' });
    stdin.pipe(writer);
    stdin.resume();
};

write();