# yl-jwt

Simplified version of JWT.

# Usage

```javascript
const { jwtResolve, jwtGenerate } = require('yl-jwt');

const data = 'test'; // any data that can be serialized
const cert = 'key'; // secrets
const expire = 2; // expired in 2s
const jwt = jwtGenerate(data, cert, expire);

setTimeout(() => {
  const rel1 = jwtResolve(jwt, cert);
  console.log('1: ' + rel1) // should be 'test'
}, 1000)

setTimeout(() => {
  const rel2 = jwtResolve(jwt, 'wrong key');
  console.log('2: ' + rel2) // wrong key, should be null
}, 1500)

setTimeout(() => {
  const rel3 = jwtResolve(jwt, cert);
  console.log('3: ' + rel3) // expired, should be null
}, 3000)

```