//js内部调用utf-16编码存储，常规字符用16位表示一个单位
//emoji和一些生僻字 占据2个单位甚至更多
console.log('a'.length)//1
console.log('🎵'.length)//2

const str = 'hello🎵';//7
console.log(str.length);
console.log(str[1])
console.log(str.charAt(1))
console.log(str.slice(1,4))
console.log(str.substring(1,4))