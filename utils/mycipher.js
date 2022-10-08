import crypto from 'crypto';

// const KEY = Buffer.from('seniorcoding!@#$'.repeat(2)); // 256 / 8 = 32 length만 지키고 자유롭게 사용하세요.
// const ALGORITHM = 'aes-256-cbc';  // 원하는 알고리즘을 입력하세요.
// const DIGEST = 'base64';    // hex로 해도 무관합니다.

class MyCipher {
  #iv;
  #KEY;
  #ALGORITHM;
  #DIGEST;

  constructor() {
    this.#iv = crypto.randomBytes(16);
    this.#KEY = Buffer.from('seniorcoding!@#$'.repeat(2));
    this.#ALGORITHM = 'aes-256-cbc';
    this.#DIGEST = 'base64';
  }

  encrypt = (data) => {
    const cipher = crypto.createCipheriv(this.#ALGORITHM, this.#KEY, this.#iv);
    return this.#iv.toString('hex') + ":" + (Buffer.concat([cipher.update(data), cipher.final()]).toString(this.#DIGEST));
  }

  decrypt = (ivdata) => {
    const [iv, data] = ivdata.split(':');
    const decipher = crypto.createDecipheriv(this.#ALGORITHM, this.#KEY, Buffer.from(iv, 'hex'));
    const decUpdateBuffer = decipher.update(data, this.#DIGEST);
    return Buffer.concat([decUpdateBuffer, decipher.final()]).toString();
  }
}

const argvLen = process.argv.length;

const option = process.argv[2];
const data = process.argv[3];

// console.log(option, data);
if (argvLen > 2 && argvLen !== 4) {
  if (option && data) {
    const mycipher = new MyCipher();
    if (option === '-enc' || option === '-e') {
      console.log(mycipher.encrypt(data));
    } else if (option === '-dec' || option === '-d') {
      console.log(mycipher.decrypt(data));
    }
  } 
} else {
  console.log('Usage> node mycipher -e|-enc data');
  console.log('Usage> node mycipher -d|-dec encryted data');
}
export default MyCipher;