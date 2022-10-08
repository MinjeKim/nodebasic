import MyCipher from "./utils/mycipher.js";

const myCipher = new MyCipher();
const data = '1q2w3er4!@#';
const encryptedData = myCipher.encrypt(data);
console.log('ENC>>', encryptedData);
const descryptedData = myCipher.decrypt(encryptedData);
console.log('결과>>', descryptedData, descryptedData === data);