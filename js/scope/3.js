var n = '苗子'
function sayName(){
    console.log(n);//undefined n已经提升到函数作用域内顶部
    if(false){//块级作用域
        var n = '小树'
    }
    console.log(n);
}
sayName();