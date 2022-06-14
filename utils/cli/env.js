import process from 'process';

export const setEnv = (key, data) => {
    process.env[key] = data;
};

export const getEnv = (key) => {
    return process.env[key];
};
