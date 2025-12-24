// es5 没有类 class 
//JS函数时一等对象
//首字母大写的 构造函数

function Car(color){//构造函数
    // this 指向新创建的对象
    this.color = color;
    //车的参数
    // this.name = 'su7';
    // this.height = 1.4;
    // this.weight = 1.5;
    // this.long = 4800;
}
Car.prototype = {
    drive(){
        console.log('drive 下赛道');
    },
    name:'su7',
    height:1.4,
    weight:1.5,
    long:4800,
}

const car1 = new Car('霞光紫');
const car2 = new Car('天蓝色');
console.log(car1,car1.name,car1.weight);
car1.drive()
console.log(car2,car2.name,car2.weight);
