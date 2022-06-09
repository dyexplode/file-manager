import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compress = async (sourcePath, destinitionPath) => {
    try {
        const zipper = createBrotliCompress();
        const inpFile = createReadStream(sourcePath);
        const outFile = createWriteStream(destinitionPath+'.bgz');
        pipeline(inpFile, zipper, outFile, (err) => {
            if (err) {
                console.log(err);
                process.exitCode = 1;
            }
        })
    } catch {
        console.log('Operation failed');
    }
};

export const decompress = async (sourcePath, destinitionPath) => {
    try {
        const unzipper = createBrotliDecompress();
        const inpFile = createReadStream(sourcePath);
        const outFile = createWriteStream(destinitionPath);
        pipeline(inpFile, unzipper, outFile, (err) => {
            if (err) {
                console.log(err);
                process.exitCode = 1;
            }
        })
    } catch {
        console.log('Operation failed');
    }
};
