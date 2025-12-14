# var_let_const

- js里面如何声明变量
  var 声明变量
  bad 和直觉不符合 
    var声明的变量 var a = 1;
    var a;在代码一开始就可以访问  **变量提升** 编译阶段(检测语法错误 )
    执行阶段
    a = 1;
  let 声明变量

  ## 报错的集合
  - ReferenceError: height is not defined
    在作用域外调用
  - TypeError: Assignment to constant variable
    常量不能改变
  - ReferenceError: Cannot access 'height' before initialization
    提前访问暂时性死区(Dead Zone) 的变量
    
 
