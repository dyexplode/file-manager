import { createHash } from 'crypto';
import { createReadStream } from 'fs';

export default async function(dir) {
    return new Promise((calcd) => {
        const hash = createHash('sha256');
        const file = createReadStream(dir);
        
        file.on('readable', () => {
            const data = file.read();
            if (data) hash.update(data);
        })

        file.on('end', () => {
            calcd(hash.digest('hex'));
        })
    });
};