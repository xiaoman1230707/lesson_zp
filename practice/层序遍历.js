function TreeNode(val,left,rigth){
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.rigth = rigth === undefined ? null : rigth;
}

function ceng(root){
    if(!root) return [];
    let queue = [];
    queue.push(root)
    let res = [];
    while(queue.length){
        let len = queue.length;
        for(let i = 0; i < len; i++){
            let top = queue.shift();
            res.push(top.val);
            top.left && queue.push(top.left);
            top.rigth && queue.push(top.rigth);
        }
    }
    return res;
}

let node = new TreeNode(1);
node.left = new TreeNode(6);
node.rigth = new TreeNode(3);

console.log(ceng(node));