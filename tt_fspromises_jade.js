import {join, basename} from 'path';
import {readFile, writeFile, readdir, mkdir, rm} from 'fs/promises';
import { existsSync } from 'fs';

const {pathname: curr} = new URL('.', import.meta.url);
const kingFld = join(curr, 'kings');
const sejongFld = join(kingFld, 'sejong');
const kingNameFile = join(kingFld, 'king-names.txt');
const sejongFile = join(sejongFld, 'sejong.txt');

try {
  // 1. folder 생성
  if (!existsSync(kingFld)) 
    await mkdir(sejongFld, {recursive: true});
  if (!existsSync(kingNameFile))
    await writeFile(kingNameFile, '세종대왕');
  if (!existsSync(sejongFile))
    await writeFile(sejongFile, '훈민정음');
    
  // 2. tree
  const ls = async (fld, depth = 0) => {
    const bname = basename(fld);
    const files = await readdir(fld, {withFileTypes: true});
    console.log(">".repeat(depth), bname);
    for (const file of files) {
      if (!file.isDirectory() || file.name.startsWith(".") || file.name === 'node_modules') {
        continue;
      }
      await ls(join(fld, file.name), depth + 1);
    }
  }

  await ls(curr);
  // 3. 내용 출력 / 삭제 / 목록 출력
  [kingNameFile, sejongFile].forEach(f => {
    readFile(f, 'utf8').then(data => {
      console.log('-----------------', basename(f))
      console.log(data);
    })
  });

  rm(kingFld, {recursive:true, force:true});
  
  // 4. 앞 2)번의 폴더 트리를 async/await을 사용하지 말고, then을 사용하여 리팩하시오.
  const result = {};
  const printResult = (obj, depth) => {
    for (const k of Object.keys(obj)) {
      console.log('>'.repeat(depth), k);
      printResult(obj[k], depth + 1);
    }
  };

  let pendingCnt = 0;

  const ls2 = (fld, obj) => { // 현재 폴더, 자식 obj
    const bname = basename(fld);
    obj[bname] = {};
    readdir(fld, {withFileTypes: true}).then(files => {
      for (const file of files ) {
        if (
            !file.isDirectory() || 
            file.name.startsWith('.') || 
            file === 'node_modules'
          ) {
          continue;
        }

        pendingCnt += 1;
        ls2(join(fld, file.name), obj[bname]);
      }
    })
    .catch(err => console.error(err)) 
    .finally(() => {
      pendingCnt -= 1;
      if (pendingCnt < 0) {
        // console.log('result :>> ', JSON.stringify(result, null, '  '));
        printResult(result, 0);
      }
    });
  }
  
  ls2(curr, result);

} catch ( error ) {}