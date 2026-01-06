/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let dummyHead = new ListNode(0, head);
    let fron = dummyHead,last = dummyHead;
    for(let i = 0; i < n ; i++){
        last = last.next;
    }
    while(last.next){
        last = last.next;
        fron = fron.next;
    }
    fron.next = fron.next.next;
    return dummyHead.next;
};