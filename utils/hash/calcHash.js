import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export const calculateHash = async () => {
    return new Promise((calcd) => {
        const hash = createHash('sha256');
        const file = createReadStream(join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToCalculateHashFor.txt'));
        
        file.on('readable', () => {
            const data = file.read();
            if (data) hash.update(data);
        })

        file.on('end', () => {
            calcd(hash.digest('hex'));
        })
    }).then((r) => {return r});
};

console.log(await calculateHash());