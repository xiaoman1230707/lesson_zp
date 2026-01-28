/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
    if(!envelopes) return 0;
    for(let i =0 ;i < envelopes.length - 1; i++){
        for(let j = i + 1; j < envelopes.length; j++){
            if(envelopes[i][0] > envelopes[j][0]) {
                [envelopes[i],envelopes[j]] = [envelopes[j],envelopes[i]]
            }
            if(envelopes[i][0] === envelopes[j][0] && envelopes[i][1] > envelopes[j][1]){
                [envelopes[i],envelopes[j]] = [envelopes[j],envelopes[i]]
            }
        }
    }
    let last = 0;
    let res = 1;
    console.log(envelopes)
    for(let i = 1; i < envelopes.length; i++){
        while( envelopes[last][0] >= envelopes[i][0] || envelopes[last][1] >= envelopes[i][1]){
            if(i >= envelopes.length) return res;
            i++
        }
        res++;
    }
    return res;
};

let envelopes = [[5,4],[6,4],[6,7],[2,3]];
let res = maxEnvelopes(envelopes);
console.log(res)