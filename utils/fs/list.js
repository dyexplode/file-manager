import { readdir } from 'fs/promises';

export default async function (dir) {
    try {
        const fileList = await readdir(dir, {withFileTypes: true});
        console.log('ddd');
        fileList.forEach((file) => {
            if (file.isDirectory()) console.log('DIR -->', file.name);
        });
        
        fileList.forEach((file) => {
            if (file.isFile()) console.log(file.name);
        });
    } catch (err) {
        console.log('Operation failed');
    }
};