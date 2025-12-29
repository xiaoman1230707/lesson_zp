let n = '苗子'
function sayName(){
    console.log(n);//'苗子'  '小树'n不会提升 将顺着作用域链找到外面的n
    if(false){//块级作用域
        let n = '小树'
    }
}
sayName();