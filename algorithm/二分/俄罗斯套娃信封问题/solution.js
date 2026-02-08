/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function(envelopes) {
    if(!envelopes || envelopes.length === 0) return 0;
     // 排序：宽度升序，高度降序（相同宽度时）
    // for(let i =0 ;i < envelopes.length - 1; i++){
    //     for(let j = i + 1; j < envelopes.length; j++){
    //         if(envelopes[i][0] > envelopes[j][0]) {
    //             [envelopes[i],envelopes[j]] = [envelopes[j],envelopes[i]]
    //         }
    //         if(envelopes[i][0] === envelopes[j][0] && envelopes[j][1] > envelopes[i][1]){
    //             [envelopes[i],envelopes[j]] = [envelopes[j],envelopes[i]]
    //         }
    //     }
    // }太慢
        envelopes.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1]; // 相同宽度，高度大的在前
        }
        return a[0] - b[0];
    });
    // 提取高度数组，求 LIS（最长递增子序列）
    const height = envelopes.map(eny=>eny[1]);
    let tails = [];// tails[i] 表示长度为 i+1 的递增子序列的最小尾部元素
    for(let h of height){
        let left = 0;
        let right = tails.length;
        while(left < right){
            let mid = Math.floor((left + right) / 2);
            if(tails[mid] < h) left = mid + 1;// 当前值太小，往右找
            else right = mid;// 当前值 >= h，可能是目标位置
        }
            // 此时 left 就是第一个 >= h 的位置
        if(tails.length === left) tails.push(h);// 没有找到 >= h 的元素 → h 比所有 tail 都大 → 可以延长序列
        else tails[left] = h;// 找到了位置 → 用 h 替换掉原来那个较大的尾部（保持“最小尾部”性质）
    }
    return tails.length
};