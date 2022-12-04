import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {hash} from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostgresErrorCode } from "../enum";
import { CreateUserDto } from "../dto";
import { UserEntity } from "../database";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

  ) {
  }
  async create(userData: CreateUserDto){
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async register(body: CreateUserDto) {
    const hashedPassword = await hash(body.password,10);

    // const user = new UserEntity();
    // user.email = body.email;
    // user.password = body.password;
    // await user.save()

    try {
      const createdUser = await this.create({
        ...body,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
