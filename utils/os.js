import os from 'os';

export default function (command) {
    switch (command) {
        case '--EOL':
            const eol = os.EOL;
            if (eol.length > 1) {
                console.log('EOL -->', '\\r\\n');
            } else {
                console.log('EOL -->', '\\n');
            }
            break;

        case '--cpus':
            const info = os.cpus();
            console.log(info);
            console.log(`Total cpus core count: ${info.length}.`);
            info.forEach((item, index) => {
                console.log(`Type of CPU#${index} ${item.model}. Current speed: ${item.speed / 1000} GHz`);
            })
            break;

        case '--homedir':
            console.log(os.homedir());
            break;

        case '--username':
            console.log(os.userInfo().username);
            break;

        case '--architecture':
            console.log(os.arch());
            break;
    }
}