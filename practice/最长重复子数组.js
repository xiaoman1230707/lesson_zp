function chongfu(a,b){
    const dp = Array.from({length:a.length + 1},()=>{new Array(b.length + 1).fill(0)});
    let res = 1;
    for(let i = 1;i <= a.length;i++){
        for(let j = 1; j <= b.length; j++){
            if(a[i - 1] === b[j - 1]){
                dp[i][j] = dp[i - 1][j - 1] + 1; 
            }
            res = Math.max(res,dp[i][j]);
        }
    }
    return res;
}

let nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7];
console.log(chongfu(nums1,nums2));