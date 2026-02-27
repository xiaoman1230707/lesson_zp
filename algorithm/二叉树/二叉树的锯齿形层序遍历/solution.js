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
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    let queue = [];
    let res = [];
    let isa = true;
    if(!root) return res;
    queue.push(root);
    while(queue.length){
        let thisrow = [];
        let len = queue.length;
        while(len--){
            let tem = queue.shift();
            tem.left && queue.push(tem.left);
            tem.right && queue.push(tem.right);
            thisrow.push(tem.val);
        }
        if(isa){
            res.push(thisrow);
        }else{
            thisrow.reverse();
            res.push(thisrow);
        }
        isa = !isa;
    }
    return res;
};