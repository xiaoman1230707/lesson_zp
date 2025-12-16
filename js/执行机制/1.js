showName();// 函数showName执行了
console.log(myname);// undefined
// console.log(hero);//报错

var myname = 'lc';
let hero = '钢铁侠'
function showName() {
    console.log('函数showName执行了');
    console.log(hero);// 钢铁侠
}