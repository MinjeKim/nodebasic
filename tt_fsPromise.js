import {writeFile, readFile, mkdir, rm, readdir, rmdir} from 'fs/promises';
import path from 'path';
// const TOPDIR = new URL('.', import.meta.url);
// 1) 현재 프로젝트 폴더 아래에 kings/sejong 폴더를 만들고,
//    kings 폴더에는 '세종대왕'이 적힌 king-names.txt를,
//    sejong 폴더에는 '훈민정음'이 적힌 sejong.txt 파일을 생성하시오.

// const kingsDir = new URL('./kings/sejong/', import.meta.url);
const kingsDir = path.join('.', 'kings', 'sejong');
const createDir = await mkdir(kingsDir, { recursive: true });
const names_url = path.join('.', 'kings', 'king-names.txt');
const sejong_url = path.join('.', 'kings', 'sejong', 'sejong.txt');

// await writeFile(names_url, '세종대왕');
// await writeFile(sejong_url, '훈민정음');
// await writeFile(new URL('./kings/king-names.txt', import.meta.url), '세종대왕');
// await writeFile(new URL('./kings/sejong/sejong.txt', import.meta.url), '훈민정음');

// 2) 현재 프로젝트 폴더의 목록 중 디렉터리(폴더)만 Tree 형태로 출력하시오.
// (단, `.`으로 시작하는 디렉터리는 제외)

let depth = 0;
const readDirToTree = async (dirName) => {
  depth += 1;
  const files = await readdir(dirName, { withFileTypes: true });
  for (const file of files) {
    if (!(file.isDirectory() && file.name.startsWith(".")) && file.name.indexOf('node_modules') < 0) {
      if (file.isDirectory()) {
        console.log("-".repeat(depth), file.name, "*");
        await readDirToTree(path.join(dirName, file.name));
      } else {
        // console.log("-".repeat(depth), file.name); // 파일 출력
      }
    }
  };
  depth -= 1;
}
// readDirToTree('.');
// readDirToTree('../jsbasic_mj');


// 비동기로 짜보기 (async/await 안쓰고)
// let depth2 = 0;
const dirArr = [];
let flag = false;

let depth2 = 0;
const thenReadDirToTree = dirName => {
  readdir(dirName, { withFileTypes: true }).then(files => {
    flag = false;
    for(const file of files) {
      let parentName;
      console.log('dirName :>> ', dirName);
      if (dirName.indexOf('/') > -1) {
        const tmp_arr = dirName.split('/');
        parentName = tmp_arr[tmp_arr.length - 1];
        console.log('dirName :>> ', dirName, tmp_arr.length);
        depth2 = tmp_arr.length;
        console.log('/가 있네요 :>> ', file.name);
      } else if (dirName !== '.') {
        depth2 = 2;
        parentName = '.';
      } else {
        parentName = dirName;
        depth2 = 1;
      }

      const fileObj = {
        name: file.name, 
        parent: parentName,
        readFlag: false,
        isDir: file.isDirectory(),
        depth: depth2
      };

      if (!(file.isDirectory() && file.name.startsWith(".")) && file.name.indexOf('node_modules') < 0) {
        // dirArr.push(fileObj);
        if (file.isDirectory()) {
          // console.log('fileObj :>> ', fileObj);
          console.log(' >>> 디렉토리입니다 ', file.name, depth2);
          dirArr.push(fileObj);
          thenReadDirToTree(path.join(dirName, file.name));
        } else {
          // dirArr.push(fileObj);
        }
      }
    }
  }).then(res => flag = true);
  // .then(printTree(dirArr));
  // .then(res => console.log('dirArr :>> ', dirArr));
}

const printTree = (dirs) => {
  // console.log('dirs :>> ', dirs);
  dirs.map((a, i) => {
    if (!a.readFlag) {
      if (a.isDir) {
        console.log('a.depth :>> ', a.depth);
        console.log("-".repeat(a.depth), a.name, "*");
        const tmpArr = dirs.filter(b => {
          // console.log(b.name.trim(), b.parent.trim(), a.name.trim());
          // console.log('b.parent.trim() :>> ', b.parent.trim());
          // console.log('a.name.trim() :>> ', a.name.trim());
          return b.parent.trim() === a.name.trim();
        });
        // console.log(a.name,depth, 'tmpArr :>> ', tmpArr);
        if (tmpArr.length !== 0) printTree(tmpArr);
      } else {
        // console.log("-".repeat(depth3), a.name);
      }
      a.readFlag = true;
    }
  });
}

// while(true) {
//   if (dirArr.length === 5) {
//     printTree(dirArr);
//     break;
//   }
// }

thenReadDirToTree('.');


const intl = setInterval(()=> {
  if(flag) {
    printTree(dirArr);
    clearInterval(intl);
  }
}, 500);

// 3) kings.txt와 sejong.txt 파일 내용을 각각 출력한 후, 
//    king-names 폴더를 삭제하고 다시 위 2)번의 폴더 목록을 출력하시오.


// readFile('./kings/sejong/sejong.txt', {flag: "r+"}).then(data => {
//   console.log(data.toString("utf8"));
// });
// readFile('./kings/king-names.txt', {flag: "r+"}).then(data => {
//   console.log(data.toString("utf8"));
// });

// rm('./kings', {recursive: true, force: true}).then(res => {
//   readDirToTree('.');
// });

