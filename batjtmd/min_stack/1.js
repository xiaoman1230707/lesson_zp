//es5 构造函数
const MinStack = function(){
    this.stack = [];//数据
}
MinStack.prototype.push = function(x){
    this.stack.push(x);
}
MinStack.prototype.pop = function(){
   return this.stack.pop();
}
MinStack.prototype.top = function(){
    if(!this.stack.length || !this.stack)
    return this.stack[this.stack.length - 1];
}
MinStack.prototype.getMin = function(){
    // - 遍历一遍
    // - Infinity 无穷大
    let minValue = Infinity;
    const {stack}  = this;
    for(let i = 0;i < stack.length; i++){
        if(stack[i] < minValue){
            minValue = stack[i];
        }
    }
}
