import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { CreateUserDto, Payload } from "../dto";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { LoginUserDto } from "../dto";
import { JwtGuard } from "../guard";
import { User } from "../decorator";
import { UserService } from "../service";
import { FileInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "../config";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto): Promise<any> {
    return this.userService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<any> {
    return this.userService.login(body);
  }

  @UseGuards(JwtGuard)
  @Get('info')
  async getInfo(@User() user:Payload){
    throw new Error("YESSSSS")
    // return user;
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @User() user:Payload) {
    return await this.userService.saveAvatar(file,user);
    console.log({ file , user });
  }
}
