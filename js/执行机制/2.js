//v8引擎看待这段代码
//编译 为什么要提升变量
var myName;//undifine
//函数更优先
function showName() {
    console.log('函数showName执行了');
}
showName();
console.log(myName);
myName = 'lc';
