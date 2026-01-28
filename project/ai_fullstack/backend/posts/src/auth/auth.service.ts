import { 
    Injectable ,
    UnauthorizedException,
} from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt  from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}
    async login({name, password}: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: {
                name,
            }
        })
        if(!user || !await bcrypt.compare(password, user.password) ){
            throw new UnauthorizedException('没有权限');
        }
        return {name, password};
    }
}