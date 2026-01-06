/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [];
    for(let i = 0; i < s.length;i++){
        let c = s[i];
        switch(c){
        case '(':
            stack.push(')');
            break;
        case '[':
            stack.push(']');
            break;
        case '{':
            stack.push('}');
            break;
        default:
            if(stack.pop() !== c)
            return false;
        }
    }
     return stack.length === 0;
};