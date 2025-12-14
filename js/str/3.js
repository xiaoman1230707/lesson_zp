 const tools = [
            {
                id:1,
                text:'学习es6'
            },
            {
                id:2,
                text:'通读你不知道的javascript'
            }
        ]
        console.log(tools.map(function(item){
            // console.log(item);
            return `<li>${item.text}</li>`
        }));
        //es6的箭头函数
        //function可以省略, => 代替
        //如果只有一个参数,可以省略括号()
        //如果只有一个语句，且是返回值 ，可以省略大括号{}
        console.log(tools.map(itme => `<li>${itme.text}</li>`))