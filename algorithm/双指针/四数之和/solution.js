/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    let res = [];
    nums.sort((a,b)=>a - b)
    for(let a = 0;a < nums.length - 1;a++){
        if(a > 0 && nums[a] === nums[a - 1]) continue;
        for(let b = a + 1; b < nums.length - 1; b++){
            if(b > a + 1 && nums[b] === nums[b - 1]) continue;
            let c = b + 1;
            let d = nums.length - 1;
            while(c < d){
                let sum = nums[a] + nums[b] + nums[c] + nums[d];
                if(sum > target) d--;
                else if(sum < target) c++;
                else{
                    res.push([nums[a],nums[b],nums[c],nums[d]]);
                    while(nums[c] === nums[c + 1] && c < d) c++;
                    while(nums[d] === nums[d - 1] && c < d) d--;
                    c++;
                    d--;
                }
            }
        }
    }
    return res;
};