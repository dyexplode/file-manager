import { createWriteStream } from 'fs';

export default async function (dir) {
    createWriteStream(dir);
    return;
};