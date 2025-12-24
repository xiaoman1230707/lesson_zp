# 原型

  - 类 构造函数  Car
  - new Car 实例
  - **prototype** 对象上添加方法或属性

## 构造函数
- constructor 
  new 的方式运行这个函数，this指向新创建的对象，构造新对象的过程
  每个实例自己的
- prototype 对象 原型
  设置的属性和方法，让这个类的所有实例都共享这些属性和方法
  因为方法内存开销大，没有必要每个实例都构造方法
  JS 面向对象是原型式的面向对象 哲学性的
  - 虽然不是直接设置在实例上 ，但是可以通过实例访问到
  - 何为prototype？
    - JS为了完成原型式的面向对象构建，实例自己的属性用constructor 构造函数初始化， 实例共享的属性和方法，用prototype 设置
    每个函数都有一个prototype属性
    - prototype 属性值是一个对象
      它上面的属性和方法或被所有的实例共享
    - 传统的class 面向对象是有血缘关系的，类定义属性和方法的模版（抽象），实例是具体的 
      JS用的是原型式的面向对象 不是血缘关系的 prototype
    - 所有的对象都有一个__proto__ 私有属性 它指向该对象的原型对象
    - 原型对象上有一个constructor 属性 它指向该对象的构造函数
      由这个构造函数创建的实例 可以享用原型对象

- 任何对象都默认指向object.prototype,除非new 其他构造函数生成的
- Object.prototype 原型是null 停止查找 尽头

## 总结
- 每个对象都有一个prototype 属性 它指向该对象的原型对象
- 构造函数也是对象 他的prototype 属性 也指向 原型对象 (可以被修改)
- 原型对象 上有一个constructor 属性 它指向该对象的构造函数
- Object的构造函数为 ƒ Object() { [native code] } 内置在JS 引擎中
- 对象实例的__proto__ 指向 原型对象
- 对象实例通过构造函数创建
## 原型链
- 而Person的prototype也是一个对象，所以他也有他的原型，通过__proto__ 指向 Object.prototype,而Object.prototype的__proto__ 是null

- 当需要调用一个实例的属性或方法时，会先在实例上查找，如果没有找到，就会去原型对象上查找，直到找到为止
  如果原型对象上也没有，就会去原型对象的原型上查找，直到找到null 为止