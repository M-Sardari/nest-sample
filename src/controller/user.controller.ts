import { Body, Controller, Get, HttpStatus, NotFoundException, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../dto";
import { ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "../dto/login-user.dto";
import { JwtGuard } from "../guard";
import { User } from "../decorator";
import { Payload } from "../dto/payload";
import { UserService } from "../service";

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

  @UseGuards(JwtGuard)
  @Get('info')
  async getInfo(@User() user:Payload){
    throw new Error("YESSSSS")
    // return user;
  }

  @UseGuards(JwtGuard)
  @Get('info2')
  async getInfo2(@User() user:Payload){
    throw new NotFoundException("YESSSSS - 404")
    // return user;
  }
}
