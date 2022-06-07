import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';

export const compress = async () => {
    const currDir = path.dirname(fileURLToPath(import.meta.url));
    const zipper = createGzip();
    const inpFile = createReadStream(path.join(currDir, 'files', 'fileToCompress.txt'));
    const outFile = createWriteStream(path.join(currDir, 'files', 'archive.gz'));
    pipeline(inpFile, zipper, outFile, (err) => {
        if (err) {
            console.log(err);
            process.exitCode = 1;
        }
    })
};

compress();