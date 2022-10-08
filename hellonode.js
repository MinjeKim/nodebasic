import { dirname, sep } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

// import { a } from './nodeutils.js';
// import { __ } from './nodeutils.js';    // cf. const { __dirname, __filename } = require('./nodeutils');
// console.log(__);
// const { __dirname, __filename } = __(import.meta.url);

console.log(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// export { __filename, __dirname };

console.log(dirname(`..${sep}nodebasic`));
console.log(__dirname); // 현재 실행한 파일 폴더 경로
console.log(__filename); // 현재 실행한 파일의 풀 경로
// console.log(sep);

// console.log(global.xx);

console.log(path.delimiter);
console.log(path.isAbsolute(__filename));

const filePath = '/Users/minje/sesac/nodebasic/hellonode.js';
console.log(path.join(__dirname, 'hellonode.js')); // 이게 원칙이다.

console.log(path.parse(filePath));
const x = path.format(
  {
    root: '/',
    dir: '/Users/minje/sesac/nodebasic',
    base: 'hellonode.js',
    ext: '.js',
    name: 'hellonode'
  }
);

console.log(x);
console.log(path.basename(x));
console.log(path.posix);
console.log(os.cpus().length); // cluster module 할 때

console.log(os.cpus());
const m = 1024 * 1024;
console.log(os.arch());
console.log(os.type());
console.log(os.version());
console.log(os.freemem()/m, '/', os.totalmem()/m);

console.log(process.env);

process.on('exit', (...args) => {
  console.log('exit :>> ', args);
});

process.exit(1);

console.log('process.argv :>> ', process.argv);
console.log('process.argv[2] :>> ', process.argv[2]);
console.log('process.argv[3] :>> ', process.argv[3]);
console.log('process.argv[4] :>> ', process.argv[4]);

import url from 'url';
const sampleUrl = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
const parsedUrl = url.parse(sampleUrl);
console.log(parsedUrl);  // Url type (urlObject)

const surl = new URL(sampleUrl);  // same as new url.URL(sampleUrl)
console.log(surl, surl instanceof URL);  // URL type
console.log(surl.toString());

const sp = surl.searchParams;
sp.append('name', 'Hong');
sp.append('name', 'Kim');

console.log(sp.toString());

sp.forEach((v, k) => console.log(k, ':', v));

const str = 'AZaz💩123켘잌45';
const buf1 = Buffer.from(str);
console.log('buf1 :>> ', buf1);

console.log('-------------------')
console.log('hex las엌\t>> ', Buffer.from('las', 'hex'));
console.log('latin1 las엌\t>> ', Buffer.from('las엌', 'latin1'));
console.log('binary las엌\t>> ', Buffer.from('las엌', 'binary'));
console.log('ascii las엌\t>> ', Buffer.from('las엌', 'ascii'));
console.log('utf8 las엌\t>> ', Buffer.from('las엌', 'utf8'));
console.log('base64 las\t>> ', Buffer.from('las', 'base64'));
console.log('base64 las+Z\t>> ', Buffer.from('las+Z', 'base64'));
console.log('base64 toString\t>> ', Buffer.from('las+Z'.toString('base64')));
