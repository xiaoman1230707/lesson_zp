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
                           Tag:{
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
                    }
                }
            })
        ]);
        // const total = await this.prisma.post.count();
        // console.log(total,'------');
        return {
            items:posts,
            total,
        }
    }
}