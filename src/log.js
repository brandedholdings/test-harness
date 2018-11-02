import chalk from 'chalk';

export default function log(...args) {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const timestamp = `[${(hour < 10 ? '0' : '') + hour}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}]`; 

    console.log(chalk.gray(timestamp), ...args);
};
