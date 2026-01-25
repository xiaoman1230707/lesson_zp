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
    if(!head || !head.next) return head;
    // 到链表尾部开始回溯 为空则返回空。注意，尾节点直接返回，倒数第二个节点才开始过递归体
    let newhead = reverseList(head.next);// 向后递归，到最后得到尾节点
    head.next.next = head;// 此节点后一个节点next指向自己，
    head.next = null;// 此节点的next指向空
    // 上两步完成链表的反转
    return newhead;
};