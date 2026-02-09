/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
    if(!nums.length) return 0;
    let left = 0;
    let right = 1;
    let res = 1;
    while(right < nums.length){
        while(nums[right] > nums[right - 1]){
            right++;
        }
        if(right - left > res) res = right - left;
        left = right++;
    }
    return res;
};