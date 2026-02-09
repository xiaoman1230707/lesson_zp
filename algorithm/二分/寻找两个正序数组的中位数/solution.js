/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    function getm(n1,s1,e1,n2,s2,e2,k){
        let n1len = e1 - s1 + 1;
        let n2len = e2 - s2 + 1;
        if(n1len > n2len) return getm(n2,s2,e2,n1,s1,e1,k);
        if(n1len === 0) return n2[s2 + k - 1];
        if(k === 1) return Math.min(n1[s1],n2[s2]);
        let l = s1 + Math.min(n1len,k >> 1) - 1;
        let r = s2 + Math.min(n2len,k >> 1) - 1;
        if(n1[l] < n2[r]) return getm(n1,l + 1,e1,n2,s2,e2,k - (l - s1 + 1))
        else return getm(n1,s1,e1,n2,r + 1,e2,k - (r - s2 + 1));
    }
    let len1 = nums1.length;
    let len2 = nums2.length;
    let m1 = (len1 + len2 + 1) >> 1;
    let m2 = (len1 + len2 + 2) >> 1;
    return (getm(nums1,0,len1 - 1,nums2,0,len2 - 1,m1) + getm(nums1,0,len1 - 1,nums2,0,len2 - 1,m2)) /2
};