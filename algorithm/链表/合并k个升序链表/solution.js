/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    function mergetwo(a,b){
        // if(!a && !b) return null;
        if(!a || !b) return a ? a : b;
        let newhead = new ListNode();
        let node = newhead;
        let ah = a,bh = b;
        while(ah && bh){
            if(ah.val < bh.val){
                node.next = ah;
                ah = ah.next;
            }else{
                node.next = bh;
                bh = bh.next;
            }
            node = node.next;
        }
        node.next = ah ? ah : bh;
        return newhead.next;
    }
    function mergearr(list){
        if(list.length <= 1) return list[0];
        const index = Math.floor(list.length/2);
        let left = mergearr(list.slice(0,index));
        let right = mergearr(list.slice(index));
        return mergetwo(left,right);
    }
    if(!lists.length) return null;
    return mergearr(lists);
};