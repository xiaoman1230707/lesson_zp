function add(a){
    return function(b){
        return a+b;
    }
}
//函数的柯理化 
console.log(add(1)(2));

