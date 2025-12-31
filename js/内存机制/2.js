function foo(){
    var a = {name:'zp'};//引用式赋值
    var b = a;//应用式拷贝
    b.name = 'zp2';
    console.log(a,b);// {name:'zp2'} {name:'zp2'}
}
foo(); 