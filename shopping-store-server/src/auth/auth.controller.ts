import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    try {
      const token = await this.authService.login(body);

      res.cookie('authToken', token.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({
        message: 'Login successful',
        status: 200,
        token: token,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Something went wrong',
        status: 500,
      });
    }
  }

  @Post('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.status(200).json({
      message: 'Logout successful',
    });
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  getCurrentUser(@Request() req) {
    const user = req.user;
    const userWithoutPassword = { ...user }; 
    delete userWithoutPassword.password; 
    return {
      message: 'User information',
      status: 200,
      user: userWithoutPassword,
    };
  }
}
