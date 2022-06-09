import { copyFile } from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';

export default async function (pathFile, newDirectory) {
    const newPathFile = path.join(newDirectory, path.basename(pathFile));
    let isExistSource;
    let isExistDestination;

    try {
        isExistSource = !await access(pathFile);
    } catch {
        isExistSource = false;
    }
    try {
        isExistDestination = !await access(newPathFile);
    } catch {
        isExistDestination = false;
    }

    if (!isExistSource || isExistDestination) {
        console.log('Operation failed');
        return;
    }

    return new Promise((resolve) => {
        copyFile(pathFile, newPathFile)
        .then(resolve);
    });
};
