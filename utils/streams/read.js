import { createReadStream, access } from 'fs';
import { stdout } from 'process';

export default async function(dir) {
    try{
        console.log(access(dir, () => {}));
        const file = createReadStream( dir, { encoding: 'utf-8' });
        
        // Use pipe
        file.pipe(stdout);
        
        // Add return after cancel file
        file.on('end', () => {
            stdout.write('\n');
        });
        
    } catch (err){
        console.log('Operation failed');
    }
};
