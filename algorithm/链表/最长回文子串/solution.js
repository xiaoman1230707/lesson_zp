/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    function ishui(s,l,r){
        const len = s.length;
        while(l >= 0 && r < len){
            if(s[l] === s[r]){
                l--;
                r++;
            }else break;
        }
        return r - l - 1;
    }
    let begin = 0;
    let maxlen = 0;
    for(let i = 0;i < s.length; i++){
        const dan = ishui(s,i,i);
        const shuang = ishui(s,i,i+1)
        const longer = Math.max(dan,shuang)
        if(longer > maxlen) {
            maxlen = longer;
            begin = i - Math.floor((maxlen - 1) / 2);
        }
    }
    return s.slice(begin ,begin + maxlen);

};