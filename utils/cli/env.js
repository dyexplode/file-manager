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

export const setEnv = (key, data) => {
    process.env[key] = data;
    // console.log('Add property:', key, "=", data);
};

export const getEnv = (key) => {
    return process.env[key];
};
