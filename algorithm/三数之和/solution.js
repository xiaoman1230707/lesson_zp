/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
   let len = nums.length;
   let res = [];
   nums.sort( (a,b) => a-b);
   for(let i = 0; i < len; i++){
    let l = i + 1;
    let r = len - 1;
    let inum = nums[i];
    if(inum > 0) break;
    if(i > 0 && nums[i - 1] === inum){
        continue;
    }
    while(l < r){
        let sum = nums[l] + nums[r] + inum;
        if(sum < 0){
            l++;
        }else if(sum > 0){
            r--;
        }else{
            res.push([nums[i],nums[l],nums[r]]);
            while(nums[l] === nums[l + 1] && l < r){
                l++;
            }
            while(nums[r] === nums[r - 1] && l < r){
                r--;
            }
            l++;
            r--;
        }
        
    }
   } 
   return res;
};