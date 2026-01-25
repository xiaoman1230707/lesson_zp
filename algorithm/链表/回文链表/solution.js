/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    let left = head;
    function dao(right){
        if(!right) return true;// 到链表尾部就开始回溯
        let res = dao(right.next) // 向后递归，回溯时得到前面遍历结果
        res = res && (right.val === left.val);// 得到这次比较结果和前面遍历结果 与运算
        left = left.next;// 左指针向后遍历，右指针会随着回溯向前遍历
        return res; // 向前返回遍历结果
    }
    return dao(head);
};