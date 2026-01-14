// 强类型可以杜绝90%的错误 
function addTs(a: number, b: number):number {
    return a + b;
}

const res1  = addTs(10, 5);
// const res2 = addTs('10', '5');//类型“string”的参数不能赋给类型“number”的参数。
console.log(res1);