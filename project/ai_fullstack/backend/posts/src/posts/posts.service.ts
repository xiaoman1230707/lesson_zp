import {
    Injectable,
} from '@nestjs/common';
import { PostQueryDto } from './dto/post-query.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService{
    constructor(private prisma: PrismaService){}

    async findAll({page,limit} : PostQueryDto){
        // 分页的游标
        const skip = ((page || 1) - 1) * (limit || 10);
        const [total,posts] =  await Promise.all([
            this.prisma.post.count(),
            this.prisma.post.findMany({
                skip, // 从哪里开始拿
                take: limit, // 拿多少个
                orderBy:{id:'desc'}, // 根据什么排序
                include:{ // 关系型的数据
                    user:{
                        select:{// 只要那些字段
                            id:true,
                            name:true,
                            avatars:{
                                select: { 
                                    filename:true,
                                    // take: 1 // 只拿一个
                                }
                            }
                        }
                    },
                    tags:{
                        select:{
                           tag:{
                                select:{
                                    id:true,
                                    name:true,
                                }
                           }
                           }
                    },
                    _count:{// 计数 
                        select:{
                            likes:true,
                            comments:true,
                        }
                    },
                    files:{
                        where:{
                            mimetype:{ startsWith:'image/' }// 必须以image开头
                        },
                        select:{filename:true}
                    }
                }
            })
        ]);
        // 整备查询数据
        const data = posts.map(post=>({
            id:post.id,
            title:post.title,
            // content 截取 作为摘要
            brief:post.content?post.content.substring(0,100):'',
            // publishedAt:post.createdAt || null,
            user:{
                id:post.user?.id,
                name:post.user?.name || '',
                avatar: `http://localhost:3000/uploads/avatar/resized/${post.user?.avatars[0]?.filename}-small.jpg`
            },
            tags:post.tags.map(tag=>(tag.tag.name)),
            totalLikes:post._count.likes,
            totalComments:post._count.comments,
            thumbnail:`http://localhost:3000/uploads/resized/${post.files[0]?.filename}-thumbnail.jpg` || ''
        }))
        // const total = await this.prisma.post.count();
        // console.log(total,'------');
        return {
            items:data,
            total,
        }
    }

    async create(data:{
        title:string,
        content:string,
        userId:number
    }){
        return this.prisma.post.create({
            data:{
                title:data.title,
                content:data.content,
                userId:Number(data.userId),
            }
        })
    }
}