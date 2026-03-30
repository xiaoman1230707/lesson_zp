function zeng(s){
    const dp = new Array(s.length).fill(0);
    dp[0] = 1;
    let res = 1;
    for(let i = 1; i < s.length; i++){
        for(let j = 0; j < i; j++){
            if(s[i] > s[j]){
                dp[i] = Math.max(dp[i],dp[j] + 1);
            }
        }
        res = Math.max(res,dp[i]);
    }
    return res;
}

let nums = [0,1,0,3,2,3];
console.log(zeng(nums));