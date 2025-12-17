# map方法
- es6 数组新增方法
  - map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
  
- MDN 文档
  - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  
- NaN
  特殊的数字(typeof number) 表示不是数字
  无效的数学计算
  - NaN 0/0 ， Infinity 6/0 超出范围 正无穷大， -Infinity -6/0 超出范围 负无穷大
  
## JS 面向对象式编程
- JS是一个完全面向对象的编程语言
  'hello'.length
  520.1314.toFixed(2)
  传统的面向对象是不可理解的
- JS为了统一代码风格，全面面向对象
  (new String('hello')).length
  为了让JS简单，傻瓜  JS底层帮我们兜底了
  包装类
  将简单数据类型的'hello'包装成String对象
  const strObj = new String('hello');
  strObj.length;
  strObj = null;释放掉
  