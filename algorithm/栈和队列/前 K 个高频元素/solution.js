/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

class MyHeap{
    constructor(compareFn){
        this.compareFn = compareFn;
        this.queue = [];
    }

    size(){
        return this.queue.length;
    }

    compare(index1, index2) {
        // 处理下标越界问题
        if (this.queue[index1] === undefined) return 1;
        if (this.queue[index2] === undefined) return -1;

        return this.compareFn(this.queue[index1], this.queue[index2]);
    }

    pop(){
        if(this.size() <= 1){
            return this.queue.pop();
        }
    const out = this.queue[0];
    this.queue[0] = this.queue.pop();

    let index = 0;
    let left = 1;
    let searchChild = this.compare(left,left + 1) > 0 ? left + 1 : left;

    while(this.compare(index,searchChild) > 0){
        [this.queue[index],this.queue[searchChild]] = [this.queue[searchChild],this.queue[index]];
        index = searchChild;
        left = index *2 + 1;
        searchChild = this.compare(left,left + 1) > 0 ? left + 1 : left;
    }
    return out;
    }

    push(x){
        this.queue.push(x);

        let index = this.size() - 1;
        let parent = Math.floor((index - 1)/2);
        while(parent >= 0 && this.compare(parent , index) > 0){
            [this.queue[index], this.queue[parent]] = [this.queue[parent], this.queue[index]];

            index = parent;
            parent = Math.floor((index - 1)/2);
        }
    }

}
var topKFrequent = function(nums, k) {
    let map = new Map();
    let res = [];
    for (const n of nums){
        map.set(n,(map.get(n) || 0) + 1)
    }
  const dp = new MyHeap((a, b) => a[1] - b[1])
  for(const entry of map){
    dp.push(entry);
    if(dp.size() > k) dp.pop();
  }
    for (let i = dp.size() - 1; i >= 0; i--) {
        res[i] = dp.pop()[0];
    }

    return res;
};