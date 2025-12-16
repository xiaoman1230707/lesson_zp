let str = 'hello';//简单数据类型
let str2 ='str';//值拷贝 复印
str2 = '你好'
console.log(str,str2);
console.log(str.length);
let obj = {//复杂数据类型 对象
    name:'张三',
    age:18,
}
let obj2 = obj;//引用拷贝 指向同一个对象
obj2.age++;
console.log(obj,obj2);

//简单数据类型 内存空间 栈内存 把值给你
//复杂数据类型 内存空间 堆内存 吧地址给你