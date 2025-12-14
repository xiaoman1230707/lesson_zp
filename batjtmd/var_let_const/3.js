const PI = 3.1415926;
const person = {
    name: 'ysw',
    age: 28
}
// person = 'hahaha';//报错
person.age = 21;
console.log(person);
// 简单数据类型的常量不能改变
// 复杂数据类型，不能改变引用地址，但可以改变引用地址中的属性值
// 如果对象一定不能变呢?
const wes = Object.freeze(person);//冻结对象
console.log(wes);
wes.age = 17;
console.log(wes);//不会改变



