        function Cat(name,color){
            this.name = name;
            this.color = color;
            //共有的属性方法 重复构造 浪费
            //函数的原型属性 
            // this.type = '猫科动物';
            // this.eat = ()=>{
            //     alert('喜欢jerry')
            // }
        }
        Cat.prototype.type = '猫科动物'
        Cat.prototype.eat = ()=>{
            console.log('喜欢jerry')
        }
        var a = new Cat('小白猫','白色')
        var b = new Cat('黑猫','黑色')
        console.log(a.type,b.type)
        a.type = '主人'
        console.log(a.type,b.type)