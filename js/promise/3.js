import fs from 'fs';
console.log(1);
// 异步代码
// I/O 操作
// 3.js线程执行时 从硬盘的文件系统调入内存
// readFile a.txt 从内存中又去硬盘的文件系统读取a.txt
//a.txt 要是存的是一本三国演义
const p = new Promise((resolve,reject)=>{
    //立即执行的函数 executor
    console.log(3);//同步的 立即执行
    fs.readFile('./a.txt',(err,data)=>{
        // console.log(err,'//////')
        if(err){
            reject(err);
            return;
        }
        // console.log(data.toString());
        resolve(data.toString());//promise 别解决了 兑现
    })
})
p.then((data)=>{
console.log(data,'////');
}).catch((err)=>{
    console.log('读取文件失败');
})
console.log(4);

