function Person(){}
function Animal(){} 
Person.prototype = new Animal();
const p = new Person();
// OOP 都需要 instanceof 关键字
// 基于血缘关系的
console.log(p instanceof Person);
console.log(p instanceof Animal);