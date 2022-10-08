import { readFile, readFileSync } from 'fs';

readFile('./package.json', 'utf8', (err, data) => {
// readFile('./package.json', (err, data) => {
  if (err) throw err;
  // console.log('data>>', data.toString(), data instanceof Buffer);
  console.log('data :>> ', data);
});


// const data = await util.promisify(fs.readFile)('./package.json');
// console.log(';;>>', data.toString('utf8'));

// const data2 = readFileSync('./package.json');
// console.log(';;>>', data2.toString('utf8'));
