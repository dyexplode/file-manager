import process from 'process';

export const parseArgs = () => {
    const arrAtr = process.argv;
    const getNext = arrAtr.shift.bind(arrAtr);
    const result = {};
    let arg; 
    while(arg = getNext()) {
        if (arg.startsWith('--username=')) {
            result[arg.split('=')[0].slice(2)] = arg.split('=')[1];
        }
    }
    return result;
};