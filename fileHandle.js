import { open } from 'fs/promises'; 


const hfile = new URL('./test.txt', import.meta.url);   // ESM

let fh;
try {
  fh = await open(hfile, 'a+');
  // console.log('fh.stat() :>> ', await fh.stat()); // stat은 시간 볼때 중요한 것.
  // fh.writeFile('훈민정음');
  // console.log('fh.readFile() :>> ', await fh.readFile({encoding:"utf8"}));
  // const buf = Buffer.from('세종대왕'); // 한글자에 3바이트(utf8)이니까
  // await fh.write(buf, 0, buf.length, null);
} catch(error) {
  console.error('Error >> ', error);
} finally {
  fh?.close();
}