function add(){
    // let sum = 0;
    // for(let i = 0; i < arguments.length; i++){
    //     sum += arguments[i];
    // }
    // console.log(arguments);
    // return arguments.reduce((prev,cur)=> prev+cur,0); // argument 不是真正的数组
    // console.log(JSON.stringify(arguments));
    // console.log([].shift.call(arguments));
    console.log([...arguments].shift());
    console.log(arguments);
}

console.log(add(1,2,3,4,5));
console.log(add(1,2,3,4,5,6,7,8,9,10));
console.log([1,2,3,4,5].reduce((prev,cur)=> prev+cur,0))