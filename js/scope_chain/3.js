//特殊的地方
function foo(){
    var maname = '极客时间';
    let test1 = 1;
    var innerBar = {
        getname:  function(){
        console.log(test1);
        return myname
    }
    ,
    setname: function(newname){
        myname = newname;
    }
}
//return 可以别外部访问
return innerBar;//闭包形成的条件 函数嵌套函数
}

var bar = foo();//出栈
//bar 里面的变量要垃圾回收吧？ 不会回收
bar.setname('极客帮')//setname 执行上下文创建
bar.getname();
console.log(bar.getname());
