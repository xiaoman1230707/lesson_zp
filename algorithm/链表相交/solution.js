/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    if(!headA && !headB) return null;
    let a = headA,b = headB;
    let lena = getListLen(headA);
    let lenb = getListLen(headB);
    if(lena < lenb){
        [headA,headB] = [headB,headA];
        [a,b] = [b,a];
        [lena,lenb] = [lenb,lena];
    }
    let cha = lena - lenb;
    for(let i = 0;i < cha;i++){
        a = a.next;
    }
    while(a !== null){
        if(a === b) return a;
        a = a.next;
        b = b.next;
    }
    return null;
};

var getListLen = function(head) {
    let len = 0, cur = head;
    while(cur) {
       len++;
       cur = cur.next;
    }
    return len;
}