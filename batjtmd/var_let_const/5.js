//js中函数是一等公民，编译阶段就会进行函数提升
//和var相同的地方是都会提升，不同的地方在于var只会提升变量声明，
// 而函数不止提升声明，连赋值也一起提升
setWidth();
//全局作用域
function setWidth(){
    //函数作用域 局部
    var width = 100;
    console.log(width);
    // {//块级作用域
    //     let a = 10;
    // }
    // console.log(a);//不能访问
}
// setWidth();
// console.log(width);//不能访问 var支持函数作用域


