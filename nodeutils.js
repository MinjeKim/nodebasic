// 다음과 같이 ESM에서 __dirname, __filename을 사용할 수 있도록 nodeutils.js를 작성하시오.
// hellonode.js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 출력 결과
// /Users/jade/workspace/fpp/nodebasic
// /Users/jade/workspace/fpp/nodebasic/hellonode.js

export { __filename, __dirname };
