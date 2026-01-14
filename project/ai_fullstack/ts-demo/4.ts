let a:number = 1;
// a = '11';//不能将类型“string”分配给类型“number”
let b:string = 'hello';
let c:boolean = true;
let d:null = null;
let e:undefined = undefined;
let arr:number[] = [1,2,3];
let user:[number,string] = [1,'Tom'];
// 泛型 类型的传参 T 
let arr2:Array<string> = ['a','b','c'];

// ts借鉴的java 
// 枚举类型 
enum Status{
    Pending,// 0
    Success,//1
    Failed//2
}
let s:Status = Status.Pending;
s = Status.Success;//可读性好很多 
// 第一次赋值就算不进行约定，也会根据赋值的类型进行约定
// ts初学 不知道怎样写时 直接any救命 
let aa:any = 1;// 任意类型 救命稻草 放弃类型约束
aa = 'hello';
aa = {};

let bb:unknown = 1;// 未知类型 比any更安全
bb = 'hello';// 使用需要前做类型检测
//bb.hello();//当成对象 会报错 ，未知类型 可以接受任何类型，但不能调用方法

let use2:{name:string,age:number,hemotown:string} = {
    name:'张三',
    age:18,
    hemotown:'万年'
}
// 接口 约定对象具有哪些属性和方法
interface IUser{
    name:string;
    age:number;
    readonly id:number;
    hobby?:string[];
}

const u:IUser = {
    name:'张三',
    age:18,
    id:1001,
    hobby:['篮球','足球']   
}

u.name = '李四'
// u.id = 1002;// 只读属性 不能修改

type ID = string | number;//自定义类型 可以是字符串或数字
let num:ID = 111;//"111"

type UserT = {
    name:string;
    age:number;
    hemotown:string;
}

const f:UserT = {
    name:'张三',
    age:18,
    hemotown:'万年'
}
