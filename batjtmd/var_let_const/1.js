//早期的JS就用来做界面交互，有一些缺失甚至不合理的地方
//语言精粹，the Good Parts, The Bad Parts
// es5只有var 申明变量 没有常量
var age = 18;//js 弱类型语言,变量类型由值决定
age++;
//约定俗成
var PI = 3.1415926;//变量大写 约定就不应该改变 编程习惯
console.log(age);
// es6 2015年 js为了像java c++一样大型语言 适合企业级开发项目
//建议不要再用var了 ，直接用let
let height = 188;
height++;
console.log(height);
const key = 'abc123';
key = 'abc234';//报错


