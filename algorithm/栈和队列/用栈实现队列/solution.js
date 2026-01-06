
var MyQueue = function() {
    this.listA = [];
    this.listB = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    let a = this.listB.length;
    while(a--){
    this.listA.push(this.listB.pop())
    }
    this.listA.push(x);
    let b = this.listA.length;
    while(b--){
        this.listB.push(this.listA.pop())
    }
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    return this.listB.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    const x = this.listB.pop();
    this.listB.push(x);
    return x;
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
     if(this.listB.length === 0) return true; 
    return false;
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */