/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let maxl = [];
    let maxr = [];
    let len = height.length;
    maxl.push(height[0])
    for(let i = 1;i < len ; i++){
        maxl.push(Math.max(height[i],maxl[i - 1]));
    }
    maxr.push(height[len - 1]);
    for(let i = len - 2;i >= 0; i--){
        maxr.unshift(Math.max(height[i],maxr[0]));
    }
    let res = 0;
    for(let i = 1; i < len - 1; i++){
        let min = Math.min(maxr[i],maxl[i]);
        if(height[i] < min) res += min - height[i];
    }
    return res;
};