import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      this.logger.error('User not found with email: ', loginDto.email);
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.error('Invalid password for user: ', user.email);
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };

    this.logger.verbose('Login successful the user is: ', user.email);
    return {
      name: user.name,
      email: user.email,
      id: user.id,
      token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) {
      this.logger.error(
        'User already exists with email: ',
        createUserDto.email,
      );
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    const newUser = await this.usersService.create(createUserDto);

    const payload = { email: newUser.email, sub: newUser.id };

    this.logger.verbose('User registered successfully: ', newUser.email);

    return {
      payload,
    };
  }
}
