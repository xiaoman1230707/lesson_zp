function huiwen(str){
    const dp = Array.from({length:str.length},()=>new Array(str.length).fill(false));
    let res = 0;
    for(let i = str.length;i >= 0; i--){
        for(let j = i; j < str.length; j++){
            if(str[i] === str[j]){
                if(i - j <= 1){
                    res++;
                    dp[i][j] = true;    
                }
                else if(dp[i - 1][j + 1]){
                    res++;
                    dp[i][j] = true;
                }
            }
        }
    }
    return res;
}

let s = "aaa";
console.log(huiwen(s));