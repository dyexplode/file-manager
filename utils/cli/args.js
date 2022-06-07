import process from 'process';

export const parseArgs = () => {
    const arrAtr = process.argv;
    const getNext = arrAtr.shift.bind(arrAtr);
    const result = [];
    let arg; 
    while(arg = getNext()) {
        if (arg.match(/^--/)) {
            result.push(`${arg.slice(2)} is ${getNext()}`);
        }
    }
    console.log(result.join(', '));
};

parseArgs();