/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let map = new Map();
    map.set(0,1);
    let res = 0;
    let pre = 0;
    for(let i of nums){
        pre += i;
        if(map.has(pre - k)){
            res += map.get(pre - k)
        }   

        if(map.has(pre)){
            map.set(pre,map.get(pre) + 1);
        }else
            map.set(pre,1);
        
    }
    return res;
};