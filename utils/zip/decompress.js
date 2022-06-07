import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createGunzip } from 'zlib';
import { fileURLToPath } from 'url';

export const decompress = async () => {
    const currDir = path.dirname(fileURLToPath(import.meta.url));
    const unzipper = createGunzip();
    const inpFile = createReadStream(path.join(currDir, 'files', 'archive.gz'));
    const outFile = createWriteStream(path.join(currDir, 'files', 'fileAfterDeCompress.txt'));
    pipeline(inpFile, unzipper, outFile, (err) => {
        if (err) {
            console.log(err);
            process.exitCode = 1;
        }
    })
};

decompress();