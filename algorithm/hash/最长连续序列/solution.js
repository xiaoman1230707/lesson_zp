/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    const set = new Set(nums);
    let long = 0;
    for(let n of set){//set可以去重，数组里可能有重复元素
        if(!set.has(n - 1)){
            let len = 1;
            let nextnum = n;
            while(set.has(nextnum + 1)){
                len++;
                nextnum++;
            }
            long = Math.max(len,long);
        }
    }
    return long;
};