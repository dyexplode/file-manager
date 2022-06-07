import { join, dirname} from 'path';
import { unlink } from 'fs/promises';
import { fileURLToPath } from 'url';

export const remove = async () => {
    const dir = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToRemove.txt');
    try {
        await unlink(dir);
    } catch {
        throw new Error('FS operation failed');
    }
};

remove();