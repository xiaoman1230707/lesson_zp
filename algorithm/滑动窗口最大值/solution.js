/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    class MonoQueue{
        query;
        constructor(){
            this.query = [];
        }
        qpop(value){
            let font = this.peek();
            if(value === font){
                this.query.shift()
            }
        }
        qpush(value){
            let back = this.query[this.query.length - 1];
            while(back !== undefined && back < value){
                this.query.pop();
                back = this.query[this.query.length - 1];
            }
            this.query.push(value);
        }
        peek(){
            return this.query[0];
        }

    }

    if(k == 1){
        return nums;
    }
    let res = [];
    let i = 0;
    const n = nums.length;
    let dqu = new MonoQueue;
    while(i < k){
        dqu.qpush(nums[i++]);
    }
    res[0] = dqu.peek();
    while(i < n){
        dqu.qpush(nums[i]);
        dqu.qpop(nums[i - k]);
        res[i -k + 1] = dqu.peek();
        i++;
    }
    return res;


};