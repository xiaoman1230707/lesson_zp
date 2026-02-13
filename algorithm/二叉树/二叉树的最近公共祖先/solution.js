/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    function hasf(node){
        if(!node) return null;
        if(node === q || node === p) return node;
        let rig = hasf(node.right);
        let lef = hasf(node.left);
        if(lef && rig) return node;
        else if(lef && !rig) return lef;
        else if(!lef && rig) return rig;
        else return null;
    }
    return hasf(root);
};