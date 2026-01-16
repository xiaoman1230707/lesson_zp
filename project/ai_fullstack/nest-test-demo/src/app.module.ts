// 一个文件一个类
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { DatabaseModule } from './database/database.module';

// 装饰器模式 让AppModule类成为了一个模块
// 披了模块的皮，那他就成为了模块

// mvc 设计模式 模型 视图 控制器
@Module({
  imports:[
    TodosModule,
    DatabaseModule,
  ],
  // 后端路由 有他的控制逻辑 做参数校验 组织逻辑处理
  controllers:[AppController],
  // 后端服务 数据库操作 提供业务逻辑 可以被其他模块调用
  providers:[AppService],
})
export class AppModule{

}