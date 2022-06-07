import { mkdir } from 'fs/promises';
import { copyFile } from 'fs/promises';
import { access } from 'fs/promises';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export const copy = async () => {
    const currDir = path.dirname(fileURLToPath(import.meta.url));
    const distPath = path.join(currDir, 'files_copy');
    const srcPath = path.join(currDir, 'files');
    let isExistSrc;
    let isExistDist;

    try {
        isExistSrc = !await access(srcPath);
    } catch {
        isExistSrc = false;
    }
    try {
        isExistDist = !await access(distPath);
    } catch {
        isExistDist = false;
    }

    if (!isExistSrc || isExistDist) {
        throw new Error('FS operation failed');
    }

    await mkdir(distPath);
    const fileList = await readdir(srcPath, { withFileTypes: true });
    fileList.forEach((file) => {
        if (file.isFile()) {
            copyFile(path.join(srcPath, file.name), path.join(distPath, file.name));
        }
    })

};

copy();
