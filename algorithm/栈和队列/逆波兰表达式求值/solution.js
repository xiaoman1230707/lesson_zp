/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    let stack = [];
   for (const token of tokens) {
        if (isNaN(Number(token))) { // 非数字
            const n2 = stack.pop(); // 出栈两个数字
            const n1 = stack.pop();
            switch (token) { // 判断运算符类型，算出新数入栈
                case "+":
                    stack.push(n1 + n2);
                    break;
                case "-":
                    stack.push(n1 - n2);
                    break;
                case "*":
                    stack.push(n1 * n2);
                    break;
                case "/":
                    stack.push(n1 / n2 | 0);
                    break;
            }
        } else { // 数字
            stack.push(Number(token));
        }
    }
    return stack[0];
};