let n = '苗子'
{
    console.log(n);//找到n但是是词法环境栈里的 在暂时性死区里 
    let n = '小树'
}