import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from '../service/user.service';
import { CreateUserDto } from "../dto";
import { ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "../dto/login-user.dto";
import { JwtGuard } from "../guard";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  // @UseGuards(JwtGuard)
  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<any> {
    return this.userService.register(body);
  }

  @Get('login')
  async login(@Body() body: LoginUserDto): Promise<any> {
    return this.userService.login(body);
  }
}
