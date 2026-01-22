import axios from './config';
import type { Post } from '@/types';

interface PostsResponse {
  items: Post[];
  // 其他字段如 total, page 等按需添加
}
export const fetchPosts = async (page:number =  1,limit:number = 10):Promise<PostsResponse>=>{
    try{
        return await axios.get('/posts',{
            params:{
                page,
                limit
            }
        })
        // console.log(response);
    }catch(err){
        console.log(err)
        return {
            items:[]
        };
    }
}