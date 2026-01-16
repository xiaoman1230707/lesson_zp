import { NestFactory } from '@nestjs/core';
// 模块化
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  // server app
  // NestFactory nest工厂
  // 给他根模型 来create一个app实例
  const app = await NestFactory.create(AppModule);
  // 3000 端口伺服 进程对象 process 
  // ?? 空值合并运算符 ES11 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
