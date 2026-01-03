function bar(){
    console.log(myname);
}
function foo(){
    var myname = '极客帮'
    bar();//运行时
}
var myname = '极客时间'
foo();//极客时间
