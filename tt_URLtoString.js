import url, { domainToASCII } from 'url';
import { toUnicode } from 'punycode';

// const sampleUrl = 'https://jade:1234@sub.케잌.com:8080/p/a/한글/h?query=string&city=서울#hash';
const sampleUrl = 'https://jade:1234케잌@도메인.com:8080/p/a/한글/h?query=string&city=서울#hash';


class MyURL extends URL {
  toString({fragment = true, auth = true, search = true, unicode = false} = {}) {
    
    let res = this.protocol + '//';
    res += auth ? (unicode ? decodeURI(this.username + ":" + this.password) : this.username + ":" + this.password) : "";
    res += unicode ? toUnicode(this.host) + decodeURI(this.pathname) : this.host + this.pathname;
    res += search ? (unicode ? decodeURI(this.search) : this.search) : "";
    res += fragment ? this.hash : "";
    // res.replace("")
    // console.log("decodeURI \t >> ", decodeURI(this.pathname))
    // console.log("URI \t\t >> ", this.pathname)
    return res;
  }
}

function toString({fragment = true, auth = true, search = true, unicode = false} = {}) {
    
  let res = this.protocol + '//';
  res += auth ? (unicode ? decodeURI(this.username + ":" + this.password) : this.username + ":" + this.password) : "";
  res += unicode ? toUnicode(this.host) + decodeURI(this.pathname) : this.host + this.pathname;
  res += search ? (unicode ? decodeURI(this.search) : this.search) : "";
  res += fragment ? this.hash : "";
  // res.replace("")
  // console.log("decodeURI \t >> ", decodeURI(this.pathname))
  // console.log("URI \t\t >> ", this.pathname)
  return res;
}

// URL.prototype.toString = ({fragment, auth, search} = false) => {
//   let res = this.protocol + '//';
//   res += auth ? this.username + ":" + this.password + "@" : "";
//   res += this.host + this.pathname;
//   res += search ? this.search : "";
//   res += fragment ? this.hash : "";

//   return res;
// }

const myurl = new MyURL(sampleUrl) // 또는 new MyURL(sampleUrl)
// const myurl = new URL(sampleUrl) // 또는 new MyURL(sampleUrl)

const parsedUrl = url.parse(sampleUrl);
// console.log(parsedUrl);  // Url type (urlObject)
// console.log(url.format(parsedUrl));
// console.log(url.format(parsedUrl, {unicode: true}));

/*

URL {
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
  origin: 'https://sub.example.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.example.com:8080',
  hostname: 'sub.example.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
} true

*/
// console.log("myurl >> ", myurl);

// const myurl = new URL(sampleUrl) 또는 new MyURL(sampleUrl)

console.log("tttf \t >> ", myurl.toString({ fragment: true, auth: true, search: true, unicode: false })); // all default
// ⇒ https://jade:1234%EC%BC%80%EC%9E%8C@xn--5u5b99k.com:8080/p/a/%ED%95%9C%EA%B8%80/h?query=string&city=%EC%84%9C%EC%9A%B8#hash

console.log("fttf \t >> ", myurl.toString({ fragment: false, auth: true, search: true, unicode: false }));
// ⇒ https://jade:1234%EC%BC%80%EC%9E%8C@xn--5u5b99k.com:8080/p/a/%ED%95%9C%EA%B8%80/h?query=string&city=%EC%84%9C%EC%9A%B8

console.log("fttt \t >> ", myurl.toString({ fragment: false, auth: true, search: true, unicode: true }));
// ⇒ https://jade:1234케잌@도메인.com:8080/p/a/한글/h?query=string&city=서울

console.log("fftt \t >> ", myurl.toString({ fragment: false, auth: false, search: true, unicode: true }));
// ⇒ https://도메인.com:8080/p/a/한글/h?query=string&city=서울

console.log("fff \t >> ", myurl.toString({ fragment: false, auth: false, search: false }));
// ⇒ https://xn--5u5b99k.com:8080/p/a/%ED%95%9C%EA%B8%80/h

console.log("ffft \t >> ", myurl.toString({ fragment: false, auth: false, search: false, unicode: true }));
// ⇒ https://도메인.com:8080/p/a/한글/h
