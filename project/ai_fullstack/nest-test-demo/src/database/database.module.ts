// 数据库基础服务 
import { Module ,Global} from '@nestjs/common';
// 数据库驱动 pg
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

@Global()// 全局服务
@Module({
    providers:[
        {
            provide:'PG_CONNECTION',
            // 连接池 
            useValue: new Pool({
                user:process.env.DB_USER,
                host:process.env.DB_HOST,
                database:process.env.DB_NAME,
                password:process.env.DB_PASSWORD,
                port:parseInt(process.env.DB_PORT || '5432',10),
            })
        }
    ],
    // 导出连接池 让其他模块可以使用
    exports:['PG_CONNECTION'],
})
export class DatabaseModule{}