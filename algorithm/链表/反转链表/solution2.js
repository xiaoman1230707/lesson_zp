/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let node = head;
    let last = null;
    while(node){
        let tem = node.next;
        node.next = last;
        last = node;
        node = tem;
    }
    return last;
};