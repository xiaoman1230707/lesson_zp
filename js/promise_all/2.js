function Person(name,age){
    this.name = name
    this.age = age
}

Person.prototype.speci = '人';
let zhen = new Person('aa',18)
console.log(zhen.speci)
const kong = {
    name:'孔子',
    hobbies:['学习','喝酒']
}

zhen.__proto__ = kong
console.log(zhen.hobbies);