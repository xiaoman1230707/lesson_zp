// 解法二 辅助单调栈
const MinStack = function(){
    this.stack = [];//数据
    this.minStack = [];//辅助栈
}
MinStack.prototype.push = function(x){
    this.stack.push(x);
    if(this.minStack.length === 0 ||
        this.minStack[this.minStack.length - 1] >= x){
        this.minStack.push(x);
    }
}
MinStack.prototype.pop = function(){
   return this.stack.pop();
   if(this.minStack[this.minStack.length - 1] === x){
       this.minStack.pop();
   }
}
MinStack.prototype.top = function(){
    if(!this.stack.length === 0)
    return this.stack[this.stack.length - 1];
}
//O(n)
MinStack.prototype.getMin = function(){
   
}
