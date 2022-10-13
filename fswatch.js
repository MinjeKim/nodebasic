import { Console } from 'console';
import fs from 'fs';

const stdout = fs.createWriteStream('./stdout.log');
const stderr = fs.createWriteStream('./stderr.log');
const logger = new Console({ stdout, stderr });
logger.log('log>>', 'LOG');
logger.error('error>>', 'Err');

// fs.watchFile('./stdout.log', {interval: 500}, (curr, prev) => {
//   console.log('curr>', curr);
//   console.log('prev>', prev);
// });


import { deptCodes as aa, deptCodes } from './codes.js'; // cf. let codes = require('./codes');
let codes = aa;

const printCodes = () => console.log('codess >> ', codes);
printCodes();
fs.watchFile('./codes.js', { interval: 500 }, async () => {
  codes = (await import(`./codes.js?update=${new Date()}`)).deptCodes; // modules엔 update, 브라우저에는 version 쓰는게 관례
  // codes = deptCodes.deptCodes;
  printCodes();
});

