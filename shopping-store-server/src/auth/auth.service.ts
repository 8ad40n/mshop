import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService){}

    async login(body: LoginDto)
      {
        const user = await this.userRepository.findOne({ where: { email: body.email } });
        if (!user) {
          throw new Error('User not found');
        }
        const isMatch = bcrypt.compareSync(body.password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }
        return {
            access_token: await this.jwtService.signAsync(body),
        };
      }
}