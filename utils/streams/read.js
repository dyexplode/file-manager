import { createReadStream } from 'fs';
import { stdout } from 'process';
import path from 'path';
import { fileURLToPath } from 'url';

export const read = async () => {
    const currFile = path.join(path.dirname(fileURLToPath(import.meta.url)), 'files', 'fileToRead.txt');
    const file = createReadStream( currFile, { encoding: 'utf-8' });
    
    // Use pipe
    file.pipe(stdout);
    
    // Add return after cancel file
    file.on('end', () => {
        stdout.write('\n');
    })
};

read();