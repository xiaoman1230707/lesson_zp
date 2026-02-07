/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let l = 0,r = 0;
    let max = 0;
    while(r < s.length){
        while(s.slice(l,r).includes(s[r])){
            l++;
        }
        r++;
        max = max > r - l ? max : r - l;
    }
    return max;
};