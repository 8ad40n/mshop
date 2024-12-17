import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/registerUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {

    const { name, email, password, phone } = registerUserDto;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role: 'Customer',
    });

    return await user.save();
  }

  async getAllCustomers()
  {
    return await this.userRepository.find({ where: { role: 'Customer' } });
  }
}
