234. 回文链表
已解答
简单

给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
 回文序列是向前和向后读都相同的序列

 

示例 1：
输入：head = [1,2,2,1]
输出：true

示例 2：
输入：head = [1,2]
输出：false
 

提示：

链表中节点数目在范围[1, 105] 内
0 <= Node.val <= 9
 

进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？


###
错误写法：
将链表倒转后再遍历两个链表。
这样导致同一个链表被倒转后无法正向遍历。

递归法：
let left = head;
    function dao(right){
        if(!right) return true;// 到链表尾部就开始回溯
        let res = dao(right.next) // 向后递归，回溯时得到前面遍历结果
        res = res && (right.val === left.val);// 得到这次比较结果和前面遍历结果 与运算
        left = left.next;// 左指针向后遍历，右指针会随着回溯向前遍历
        return res; // 向前返回遍历结果
    }
    dao(head);