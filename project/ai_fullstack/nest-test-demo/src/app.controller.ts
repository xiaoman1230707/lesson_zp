import { Body, Controller, Get ,Post, Inject} from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController{
  // service 实例
  constructor(
    @Inject('PG_CONNECTION') 
    private readonly dp:any,
    private readonly appService:AppService
   ){}
    @Get()
    getHello():string{
      return this.appService.getHello()
    }

    @Get('welcome')
    getWelcome():string{
      return this.appService.getWelcome()
    }

    @Post('login')
    login(@Body() body:{username:string,password:string}){
      const {username,password} = body;
      console.log(username,password);
      if(!username || !password){
        return {
          code:400,
          msg:'用户名或密码不能为空'
        }
      }
      if(password.length < 6){
        return {
          code:400,
          msg:'密码长度不能小于6位'
        }
      }
      return this.appService.handleLogin(username,password);
    }

    @Get('db-test')
    async testDb(){
      try{
        const res  =await this.dp.query('select * from users');
        return {
          status:'连接成功',
          data:res.rows
        }
      }catch(err){
        return {
          status:'连接失败',
          error:err.message
        }
      }
    }
}