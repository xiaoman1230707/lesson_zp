/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    function galltare(node,s){
        if(!node) return true;
        if(s === '') s = s + node.val;
        else s = s + '->' + node.val;
        let ln = galltare(node.left,s);
        let rn = galltare(node.right,s);
        if(ln && rn) res.push(s);
        return false;
    }
    let res = [];
    let s = '';
    galltare(root,s);
    return res;
};