import { unlink } from 'fs/promises';

export default async function(dir) {
    try {
        await unlink(dir);
    } catch {
        console.log('Operation failed');
    }
};
