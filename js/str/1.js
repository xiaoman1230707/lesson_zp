//坚持一种风格,遵守公司代码风格
let str = 'hello world';
let str2 = "hello world";
//es6 模板字符串 可以换行 可以嵌入变量
//其他大型语言都有字符串模板功能，js不再去拼接，
let w = 'world';
let str4 = 'hello ' + w;//es5
let str3 =`hello ${w}`;//es6

//String类 对象  不是string类型
//字符串对象
let str5 = new String('abc');
console.log(str5,
    str5.valueOf(),
    typeof str5,
    typeof str4,
    Object.prototype.toString.call(str5)
);

console.log(str4.length,str5.length);
