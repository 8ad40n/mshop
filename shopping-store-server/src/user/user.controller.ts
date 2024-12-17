import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try{
      return await this.userService.register(registerUserDto);
    }
    catch (error) {
      throw new Error(error.message);
    }
  }

  @Get("/getAllCustomers")
  async getAllCustomers() {
    return await this.userService.getAllCustomers();
  }
}
