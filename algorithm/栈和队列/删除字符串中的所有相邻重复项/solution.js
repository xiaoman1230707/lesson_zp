/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function(s) {
    let stack = [];
    let a = Array.from(s);
    for(let i = 0; i < s.length; i++){
        if(a[i] === stack[stack.length - 1]) stack.pop();
        else
        stack.push(a[i]);
    }
    return stack.join('');
};