let str = 'hello';//str 简单数据类型 在词法环境
console.log(len(str));// 函数是编程 面向对象式编程
console.log(str.length);//5  作为对象 自动装箱
let str2 = new String('hello');
console.log(typeof str,typeof str2);
console.log(str2.length);//5 
