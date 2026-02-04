import {client} from './app.service.mjs';
// 支持promisify fs模块 可以直接使用await 读写文件 thenable
import fs from 'fs/promises'; // node 内置的文件模块 
// 读取文件内容
// const content = await fs.readFile('./data.txt','utf-8');
const inputFilePath = './data/posts.json';// 读取文件路径
const outputFilePath = './data/posts-embedding.json';// 写入文件路径 往json中加入向量字段

const data = await fs.readFile(inputFilePath,'utf-8');
const posts = JSON.parse(data);
// console.log(posts[0]);

const postWithEmbedding = [];

for (const {title,category} of posts){
    const response = await client.embeddings.create({
        model:'text-embedding-ada-002',
        input:`标题:${title} 分类:${category}`,
    })
    postWithEmbedding.push({
        title,
        category,
        embedding:response.data[0].embedding,
    })
}
// null 的含义是不做任何修改 2为缩进2个空格
await fs.writeFile(outputFilePath,JSON.stringify(postWithEmbedding,null,2));
