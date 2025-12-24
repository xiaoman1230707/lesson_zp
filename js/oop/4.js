        function Cat(name,color){
            this.name = name;
            this.color = color;
        }
        //constructor 在共享属性和方法面前有点孤木难支
        //prototype 解决浪费和共享
        Cat.prototype.type = '猫科动物'
        Cat.prototype.eat = ()=>{
            alert('喜欢jerry')
        }
        var a = new Cat('小白猫','白色')
        var b = new Cat('黑猫','黑色')
        console.log(Cat.prototype.isPrototypeOf(a))
        //实例上的属性？ prototypt 上的属性？
        console.log(a.hasOwnProperty('type'))//是否是实例上的属性
        console.log(a.hasOwnProperty('name'))
        console.log('type' in a)//是否是原型上的属性
        console.log('name' in a)
        for(var key in a){
            console.log(key)
        }