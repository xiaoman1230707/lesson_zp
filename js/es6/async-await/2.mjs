import { rejects } from 'assert';
import fs from 'fs';
import { resolve } from 'path';

//es6 之前,用 回调函数做异步
// fs.readFile('./1.html','utf-8',(err,data)=>{
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(data.toString());
//     console.log('111')
// })

const p = new Promise((resolve,rejects)=>{
fs.readFile('./1.html','utf-8',(err,data)=>{
    if(err){
        rejects(err)
        return
    }
    resolve(data)
})
})
// p.then(data=>{
//     console.log(data);
//     console.log('111')
// })

const main = async ()=>{
    const html = await p
    console.log(html);
    console.log('111')
}
main()
