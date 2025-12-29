function add(a,b,c,d){
    return a+b+c+d;
}
// console.log(add.length);//得到参数的数量
function curry(fn){
    // closure curry fn
    // curried  args 收集参数 不那么严谨的柯理化函数
    return function curried(...args){
        //curried 闭包
        if(args.length>=fn.length){
            return fn(...args);//退出
        }
        return (...rest) => curried(...args,...rest);
    }
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)(4));
