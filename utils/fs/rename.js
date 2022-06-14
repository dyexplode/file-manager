import { rename } from 'fs/promises';
import { access } from 'fs';

export default async function (oldName, newName) {
    access(oldName, (err) => {
        if (err) {
            console.log('Operation failed');
        };
        access(newName, (err) => {
            if (err) {
                rename(oldName, newName);
                return;
            }
            console.log('Operation failed');
        })
    })
};
