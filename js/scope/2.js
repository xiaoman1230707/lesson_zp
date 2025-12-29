var globalVar = '全局变量';
function myFunction(){
    var localVar = '局部变量';
    console.log(localVar);
    console.log(globalVar);
}
myFunction();
console.log(globalVar);
console.log(localVar);
