import http from 'http';
import https from 'https';

http.get('http://localhost/json', res => {
  res.setEncoding('utf8');
  res.on('data', chunk => {
    console.log('chunk :>> ', JSON.parse(chunk));
  });
  res.on('end', () => console.log('No more data in response.'));
});

const options1 = {
  hostname: 'localhost',
  path: '/json',
  port: 80,
  method: 'GET',
};
const options2 = {
  hostname: 'localhost',
  path: '/',
  port: 80,
  method: 'POST',
};
const req = http.request(options1, res => {
  res.on('data', chunk => {
    console.log('chunk :>> ', chunk);
  })
});
const req2 = http.request(options2, res => {
  res.on('data', chunk => {
    console.log('chunk :>> ', chunk);
  })
});
//req.write(...);  // body to send
// req.end();
