//打印结果是？
//parseInt callback函数
//parseInt(elment,index,arr)
[1,2,3].map(function(item,index,arr){
    console.log(item,index,arr);
    return item;
})
console.log([1,2,3].map(parseInt));

console.log(parseInt(1,0,[1,2,3]));//1
console.log(parseInt(2,1,[1,2,3]));//NaN
console.log(parseInt('ff',16))//225
