import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserService } from '../service/user.service';
import { CreateUserDto } from "../dto";
import { ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "../dto/login-user.dto";
import { Jwt2Guard } from "../guard";
import { User } from "../decorator";
import { Payload } from "../dto/payload";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<any> {
    return this.userService.register(body);
  }

  @Get('login')
  async login(@Body() body: LoginUserDto): Promise<any> {
    return this.userService.login(body);
  }

  @UseGuards(Jwt2Guard)
  @Get('info')
  async getInfo(@User() user:Payload){
    return user;
  }
}
