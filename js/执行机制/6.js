func();//报错 func提升了，但是未赋值 函数表达式不会提升
let func = ()=>{
    console.log(123);
}