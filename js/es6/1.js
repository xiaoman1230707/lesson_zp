//如何一次性声明多个变量
// let a = 1, b = 2, c = 3;

// 数组解构赋值
// es6为了优雅而来
// let [a,b,c] = [1,2,3];
// console.log(a,b,c);

//嵌套数组
// const arr = [1,[2,3,[4],5]];
// const [a,[b,c,[d],e]] = arr
// console.log(a,b,c,d,e);

// const arr = [1,2,3,4,5];
//余下的 数组
//reset 运算符
// const [a,...b] = arr
// console.log(a,b);

const users = ['David','James','Luka','Tom','Jerry','Mike']
//左右一致
const [coath,...players] = users
console.log(coath,players);
const sex = 'boy';//常量
const obj = {
    name:'刘翔',
    age:18,
    // 'sex':sex
    //es6 对象属性简写语法shorthand property
    sex,
    like:{
        n:'唱跳'
    }
}
// let name = obj.name;
//一次性解构一个对象
//只要左右两边一样[]{} 都能解开
let {name,age,like:{n}} = obj
console.log(name,age,n);

const [a,b,...c] = 'hello'
console.log(a,b,c);

// const str = 'hello'
// console.log(str.length);
//包装类
const {length} = 'hello'//长度
console.log(length);