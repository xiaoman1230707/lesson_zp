let myname = 'Jerry'
// console.log('我是' + myname);
//${myname} 插值表达式
console.log(`我是${myname.toUpperCase()}`);

for(let x of myname){
    console.log(x);
}


const user = {
  name: 'Alice',
  age: 25,
  city: 'Beijing'
};

for (let key in user) {
  console.log(key);        // 属性名
  console.log(user[key]);  // 属性值
}