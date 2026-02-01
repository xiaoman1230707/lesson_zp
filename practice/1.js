/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let fast = 0;
    for(let i = 0; i <= fast && i < nums.length ; i++){
        if(i + nums[i] > fast) fast = i + nums[i];
    }
    console.log(fast);
    if(fast >= nums.length - 1) return true;
    return false;
};

const nums = [1,1,1,0];
console.log(canJump(nums));