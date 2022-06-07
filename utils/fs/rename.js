import { join, dirname } from 'path';
import { rename as fsRename } from 'fs/promises';
import { access } from 'fs';
import { fileURLToPath } from 'url';

export const rename = async () => {
    const dir = join( dirname(fileURLToPath(import.meta.url)), 'files', 'wrongFilename.txt');
    access(dir, (err) => {
        if (err) {
            throw new Error('FS operation failed');
        };
        access(join(dirname(fileURLToPath(import.meta.url)), 'files', 'properFilename.md'), (err) => {
            if (err) {
                fsRename(dir, join(dirname(fileURLToPath(import.meta.url)), 'files', 'properFilename.md'));
                return;
            }
            throw new Error('FS operation failed');
        })
    })
};

rename();