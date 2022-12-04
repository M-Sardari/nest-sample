import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from '../service/user.service';
import { CreateUserDto } from "../dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<any> {
    return this.userService.register(body);
  }
}
