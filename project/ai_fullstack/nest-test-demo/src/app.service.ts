// 依赖注入
import { Injectable} from '@nestjs/common'
// controller 服务与路由 树根
// service 店里的厨师 Injectable 可被注入的
@Injectable()
export class AppService {
  getHello(): string {
    return 'yeah 口你急哇';
  }
  getWelcome():string{
    return 'welcome to nestjs'
  }
  handleLogin(username:string,password:string){
    if(username === "admin" && password === "123456"){
      return {
        code:200,
        msg:'登录成功'
      }
    }else{
      return {
        code:400,
        msg:'登录失败'
      }
    }
  }
}