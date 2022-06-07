import { stdin, stdout } from 'process';
import { Transform } from 'stream';

export const transform = async () => {
    const trans = new Transform({
        transform(chunk, encoding, cb) {
            cb(null, chunk.toString().split('').reverse().join('').slice(1) + '\n');
        },
    })

    stdin.pipe(trans).pipe(stdout);
    stdin.resume();
};

transform();