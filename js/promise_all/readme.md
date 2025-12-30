# Promise.all

- Promise es6 提供的异步解决方案\
- 实例 __proto__ 指向原型对象
  js 面向对象不是血缘关系 而是原型链关系
- 原型对象 constructor 指向构造函数 动态的
  火车/车 车头(constructor) 车身可以分开

new Promise 
中的参数函数体内 为executor 执行器 立即执行 可为异步任务。
调用 resolve() 成功
调用 reject() 失败

实例
.then()：处理成功结果
.catch()：处理失败结果
.finally()：无论成功或失败都会执行（可选）
- 都会返回一个新的Promise