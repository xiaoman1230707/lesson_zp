//null 和 undefined 区别
//声明但没赋值，变量类型无法确定，所以是undefined
//或对象属性/数组元素不存在时，JS自动给undefined
//JS弱类型语言
let a;
console.log(a);
let obj = {
    name:'张三'
}
a = 1;//变量类型由值决定
console.log(obj.girlFriend,'////');
console.log(typeof a);

//null表示一个空值 确定的为空 而不是未定义
//主动赋值给变量，表示为空
let b = '原有的值';
b = null;
