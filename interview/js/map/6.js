let str = 'hello';
//slice支持负数索引从后往前
//substring不支持负数索引 -3转换为0
console.log(str.slice(-4,-1));//ell
console.log(str.substring(-4,-1));//''
console.log(str.slice(3,1));//''
//substring 自动从小的开始大的作为终点
console.log(str.substring(3,1));//el

console.log(str.indexOf('l'));//2
console.log(str.lastIndexOf('l'));//3
