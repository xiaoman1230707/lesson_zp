// bar 是一个对象，定义在全局作用域
// 内存中在堆内存中 在变量环境的栈内存中只是对象在堆内存中的地址
var bar = {
    myName: "time.geekbang.com",
    // 在全局作用域中对象里面的函数 也是在全局定义的
    printName : function(){
        // 变量查询？
        // 变量的查找规则 找自己 -> 沿着作用域链查找
        // 作用域链即为变量的查找路径
        // outer 词法作用域链由声明的位置决定
        // 自由变量 在函数内部使用 但既不是函数的参数 也不是局部变量
        // 而是来自外层作用域的变量 
        console.log(myName);
        // console.log(bar.myName);
        console.log(this.myName);
    }
}
function foo (){
    let myName = '极客时间'
    return bar.printName;
}
// printName_ 在全局块级作用域里的 词法环境里的变量
// 指向printName 函数的引用
let myName = '全局极客时间'
let printName_ = foo();
printName_();