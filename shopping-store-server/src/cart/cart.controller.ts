import { Body, Controller, Delete, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard) 
  @Post('add')
  async addToCart(@Request() req, @Body() createCartDto: CreateCartDto) {
    const userEmail = req.user.email; 
    const cart = await this.cartService.addToCart(userEmail, createCartDto);
    return { message: 'Product added to cart successfully', cart };
  }

  @UseGuards(AuthGuard) 
  @Get('user')
  async getUserCart(@Request() req) {
    const userEmail = req.user.email; 
    return await this.cartService.getUserCart(userEmail);;
  }

  @UseGuards(AuthGuard) 
  @Delete('clear')
  async clearCart(@Request() req) {
    const userEmail = req.user.email;
    await this.cartService.clearCart(userEmail);
    return { message: 'Cart cleared successfully' };
  }
}
