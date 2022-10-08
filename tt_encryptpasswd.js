import crypto from 'crypto'

// 1) 다음과 같이 pbkdf2함수로 Password를 암호화하는 비동기(Promise) 함수를 작성하시오. (단, 16384회 key-stretching, 길이 128, 알고리즘 sha512 해싱)

const encryptPassword = (data, salt = crypto.randomBytes(64).toString('base64')) => new Promise((resolve, reject) => {
  crypto.pbkdf2(data, salt, 16384, 128, 'sha512', (err, derivedKey) => {
    if (err) reject(err);
    resolve(derivedKey.toString('base64'));
  });
}); 

const salt = crypto.randomBytes(64).toString('base64');
const data = '1q2w3e!@#';
const encryptedPassword = await encryptPassword(data, salt);
console.log('암호화된 Password>>', encryptedPassword);

// 2) 다음과 같이 위에 작성한 encryptPassword와 scryptSync 함수의 속도를 비교해보시오.
console.time('PBKDF2');
console.log(await encryptPassword(data));
console.timeEnd('PBKDF2');

console.time('SCRYPT');
console.log(crypto.scryptSync(data, salt, 128, { N: 16384 }));
console.timeEnd('SCRYPT');