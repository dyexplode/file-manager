import process from 'process';

export const parseEnv = () => {
    const envItem = process.env;
    const arrProp = [];
    Object.keys(envItem).forEach((key) => {
        if (key.match(/^RSS_/)) {
            arrProp.push(`${key}=${envItem[key]}`);
        }
    })
    console.log(arrProp.join('; '));
};

parseEnv();