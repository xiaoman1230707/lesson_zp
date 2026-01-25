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
var sortList = function(head) {
    function mergetwo(a,b){
        let newhead = new ListNode();
        let node = newhead;
        while(a && b){
            if(a.val < b.val){
                node.next = a;
                a = a.next;
            }else{
                node.next = b;
                b = b.next;
            }
            node = node.next;
        }
        node.next = a?a:b;
        return newhead.next;
    }
    function sortList(head,tail){
        if(!head) return head;
        if(head.next === tail){
            head.next = null;
            return head;
        }
        let slow = head,fast = head;
        while(fast !== tail){
            slow = slow.next;
            fast = fast.next;
            if(fast !== tail) fast = fast.next;
        }
        return mergetwo(sortList(head,slow),sortList(slow,tail));
    }

    if(!head) return null;
    return sortList(head,null);
};