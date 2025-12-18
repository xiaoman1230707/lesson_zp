// function add(nums){
//     nums.push();
//     return nums.reduce((pre,cur)=>pre+cur,0)
// }
const add = function(x, y){
    // fetch //不确定的 
    return x + y;//纯函数
}

const nums = [1,2,3];
add(nums);//副作用
console.log(nums);//不可预测了