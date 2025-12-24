//开发约定，首字母大写，就是一个类
//name color 模版，抽象的，封装的特性在显现
var Cat = {
    name:'',
    color:''
}
var cat1 = {};//空对象
cat1.name = '加菲猫';
cat1.color = '橘色';
var cat2 = {};
cat2.name = '小白猫';
cat2.color = '白色';
//麻烦 且无关联
//函数封装实例化的过程  (__proto__  prototype  constructor)
