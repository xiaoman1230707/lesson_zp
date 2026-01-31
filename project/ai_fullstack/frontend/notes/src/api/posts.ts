import instance from './config';
import type { Post } from '@/types';

interface PostsResponse {
  items: Post[];
  total: number;
  // 其他字段如 total, page 等按需添加
}

export const fetchPosts = async (page:number =  1,limit:number = 10):Promise<PostsResponse>=>{
    try{
        return await instance.get('/posts',{
            params:{
                page,
                limit
            }
        })
        // console.log(response);
    }catch(err){
        console.log(err)
        return {
            items:[],
            total:0,
        };
    }
}
// 发表文章
export const createPosts = async ()=>{
    try{
    return await instance.post('/posts',{
        title:'测试标题',
        content:'测试内容',
    })
    }catch(err){
        // console.log(err);
    }
}