// es新特性检测

// Promise
console.log(
    'promise：',
    new Promise((resolve, reject) => {
        console.log('promise!');
    })
);

// async & await
function sleep(time) {
    console.log('async & await:', time);
}
async function count() {
    let counter = 1;
    for (let i = 0; i < 3; i++) {
        await sleep(counter++);
    }
}
count();

// Decorators
const decro = (val) => (_class) => new _class(val);
@decro('abc')
class Test {
    constructor(val) {
        this.val = val;
    }

    log() {
        console.log('Decorators:', this.val);
    }
}
Test.log(); // "abc"

// Map
console.log('Map:', new Map());

// 乘方
console.log('8的2次方：', 8 ** 2);

// 空格补齐
console.log('空格补齐:');
console.log('abc'.padStart(10));
console.log(`${'abc'.padEnd(6)}def`);
console.log('5'.padEnd(10, '=*')); // '5=*=*=*=*='
console.log('5'.padStart(10, '=*')); // '=*=*=*=*=5'

// Array.prototype.includes
console.log('Array.prototype.includes:', 'abc'.includes('a'));

// findIndex
console.log('findIndex:', ['babel1', 'babel'].findIndex((item) => item === 'babel'));

const ttObj = { x: 1, y: 2, z: 3, d: 4 };
// Object Rest&Spread
const { x, y, ...z } = ttObj;
console.log('Object Rest&Spread:');
console.log(x); // 1
console.log(z); // 输出{ z: 3, d: 4 }

const n = { x, y, ...z };
console.log(n); // 输出{x:1,y:2,z:3,d:4}

const t = ttObj;
const { x: aa, ...tt } = t;
console.log(tt);

const ts = {
    delayRejection: true,
    ...ttObj,
};
console.log(ts);

// Object.assign
console.log('Object.assign:', Object.assign(ttObj, { c: `${t.x}-001` }));

// Object.defineProperty
Object.defineProperty(t, 'a', {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true,
});

// Object.getOwnPropertyDescriptors
Object.getOwnPropertyDescriptors(ttObj);
/* {
 x: { value: 1, writable: true, enumerable: true, configurable: true },
  y: { value: 1, writable: true, enumerable: true, configurable: true },
  z: { value: 2, writable: true, enumerable: true, configurable: true }
} */
Object.getOwnPropertyDescriptors(ttObj, 'x');
/* { value: 1, writable: true, enumerable: true, configurable: true } */

// Object.values
Object.values(ttObj); // 输出[ 1, 2 ]
for (const value of Object.values(ttObj)) {
    console.log('Object.values:', value); // 1, 2
}

// Object.entries
Object.entries(ttObj); // 输出[ [ 'a', 1 ], [ 'b', 2 ] ]
for (const [key, value] of Object.entries(ttObj)) {
    console.log('Object.entries:', [key, value]); // ['a', 1], ['b', 2]
}
