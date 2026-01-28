const tails = []; // tails[len] = 长度为 len+1 的递增子序列的最小尾部值
heights = [10, 9, 2, 5, 3, 7, 101, 1]

for (let h of heights) {
    // 第一步：用二分查找找到 h 应该插入的位置
    let left = 0, right = tails.length;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (tails[mid] < h) {
            left = mid + 1;   // 当前值太小，往右找
        } else {
            right = mid;      // 当前值 >= h，可能是目标位置
        }
    }

    // 此时 left 就是第一个 >= h 的位置

    if (left === tails.length) {
        // 没有找到 >= h 的元素 → h 比所有 tail 都大 → 可以延长序列
        tails.push(h);
    } else {
        // 找到了位置 → 用 h 替换掉原来那个较大的尾部（保持“最小尾部”性质）
        tails[left] = h;
    }
}

console.log(tails);
