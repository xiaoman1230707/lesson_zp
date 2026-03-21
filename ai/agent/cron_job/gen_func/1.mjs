// 生成器函数
function *fruitGenerator(){
    console.log('开始');
    yield 'apple';
    console.log('生产了苹果继续生产');
    yield 'orange';
    console.log('生产了橙子，生产结束');
    return '没了';
}
// 生成器对象 迭代器
const fruitMachine = fruitGenerator();
fruitMachine.next();
console.log(fruitMachine.next());
fruitMachine.next();
