/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let len = nums.length;
    let end = 0;
    let maxb = 0;
    let step = 0;
    for(let i = 0; i < len - 1;i++){
        maxb = Math.max(maxb,i + nums[i]);
        if(end === i) {
            end = maxb;
            step++;
        }
    }
    return step;
};