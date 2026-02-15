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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
    function deleteN(node){
        if(!node) return null;
        if(node.val < key){
            node.right = deleteN(node.right);
            return node;
        }else if(node.val > key){
            node.left = deleteN(node.left);
            return node;
        }else{
            let l = node.left;
            let r = node.right;
            if(!l) return r;
            else if(!r) return l;
            else{
                let minl = r;
                while(minl.left){
                    minl = minl.left;
                }
                minl.left = l;
                return r;
            }
        }
    }
    return deleteN(root);
};