import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostgresErrorCode } from "../enum";
import { CreateUserDto } from "../dto";
import { UserEntity } from "../database";
import { LoginUserDto } from "../dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtHandler } from "../guard/jwt-handler.service";
import * as process from "process";
import { REDIS, RedisClient } from "gadin-redis";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtHandler,
    @Inject(REDIS) private readonly redisService: RedisClient
  ) {
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findByEmail(email: string) {
    const user: UserEntity = await this.usersRepository.findOneBy({ email });
    if (user) return user;
    throw new HttpException(
      "User with this email does not exist",
      HttpStatus.NOT_FOUND
    );
  }

  async register(body: CreateUserDto) {
    const hashedPassword = await hash(body.password, 10);

    // const user = new UserEntity();
    // user.email = body.email;
    // user.password = body.password;
    // await user.save()

    try {
      const createdUser = await this.create({
        ...body,
        password: hashedPassword
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          "User with that email already exists",
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async createAccessToken(id: number, email: string) {
    const accessToken = { accessToken: await this.jwtService.sign({ id, email }, '10m') };
    const key = `jwt-expire-${id}-${accessToken.accessToken}`;
    await this.redisService.set(key, `${accessToken.accessToken}`);
    // await this.redisService.expire(key,1670507424)
    return accessToken
  }

  async login(body: LoginUserDto) {
    try {
      const user = await this.findByEmail(body.email);
      const isPasswordMatched = await compare(body.password, user.password);
      if (!isPasswordMatched)
        throw new HttpException(
          "Wrong credentials provided",
          HttpStatus.BAD_REQUEST
        );
      return this.createAccessToken(user.id, user.email);
      // return "OK";
    } catch (error) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
