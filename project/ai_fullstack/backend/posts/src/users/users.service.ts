import { 
    Injectable,
    BadRequestException, // 错误处理
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-users.dto";


@Injectable()
export class UsersService{
    constructor(private readonly prisma:PrismaService){}
    async register(createUserDto:CreateUserDto){
      const { name, password } = createUserDto;
    // console.log(name, "--------");
    const existingUser = await this.prisma.user.findUnique({
      where: {
        name
      }
    })
    if (existingUser) {
      throw new BadRequestException("用户名已存在")
    }
    return createUserDto
  }
}