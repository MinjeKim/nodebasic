import { readFile, readFileSync, rmdir } from 'fs';
import path from 'path';
import fs from 'fs';

// const hfile = path.json(__dirname, 'package.json');      // CJS
// const hfile = new URL('./package.json', import.meta.url);   // ESM
const hfile = new URL('./test.txt', import.meta.url);   // ESM
const usePromise = true;


if (usePromise) {
  const {readFile, writeFile, appendFile, mkdir, rm, readdir, readlink, rmdir} = fs.promises;
  // await writeFile(hfile, '세종대왕\n');
  // await appendFile(hfile, '세종대왕\n');
  const data  = await readFile(hfile, {encoding: "utf8", flag: "r"});
  console.log('data :>> ', data);

  ////////////
  try {
  // const projectFolder = new URL('./test/project/', import.meta.url);
  // const testFolder = new URL('./test/', import.meta.url);
  // const createDir = await mkdir(testFolder, { recursive: true });
  // const createDir = await mkdir(projectFolder, { recursive: true });
  const linkfile = new URL('./')
  // await rmdir(projectFolder);

  // rm(new URL('./test', import.meta.url), { recursive: true, force: true });
  // rm('./test', { recursive: true, force: true });  // rmdir's recursive is deprecated!!

  // const files = await readdir('.', { withFileTypes: true });
  // for (const file of files) console.log('f=', file.name, file.isDirectory());
  // for (const file of files) console.log('f=', file);

  // const sss = await readlink('./sss'); 
  // console.log('sss>>', sss);

  // 디렉토리는 파일의 묶음
  // 폴더는 더 큰 범위
  } catch(e) {
    console.error(e);
  }
} else {
  readFile(hfile, 'utf8', (err, data) => {
  // readFile('./package.json', (err, data) => {
    if (err) throw err;
    // console.log('data>>', data.toString(), data instanceof Buffer);
    console.log('data :>> ', data);
  });
}

// util.log는 잘 안씀이제 보통 pm2의 log파일을 씀
// import util from 'util';
// const data = await util.promisify(readFile)('./package.json');
// console.log(';;>>', data.toString('utf8'));

// const data2 = readFileSync('./package.json'); // allstop이라서 가능하면 안쓰는게 좋다!
// console.log(';;>>', data2.toString('utf8'));

// 파일은 inode로 이루어져 있는데, unlink는 파일과의 링크를 끊어버리므로 inode는 모르는 것
// 디스크 상으로는 남아있으나 파일을 덮어쓰기 전까지는 남아있게 되는 것
