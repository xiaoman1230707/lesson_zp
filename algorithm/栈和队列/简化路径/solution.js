/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    const spl = path.split('/');
    let stack = [];
    for(const x of spl){
        switch(x){
            case '..':
            stack.pop();
            break;
            case '.':
            break;
            case '':
            break;
            default:
            stack.push(x)
        }
    }
    const res = '/' + stack.join('/');
    return res;
};