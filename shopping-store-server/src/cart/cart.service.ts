import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addToCart(email: string, createCartDto: CreateCartDto) {
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    let cart = await this.cartRepository.findOne({ where: { user: { id: user.id } } });
  
    if (cart) {
      cart.cart_data = createCartDto.cart_data;
      cart = await this.cartRepository.save(cart);  
    } else {
      cart = new Cart();
      cart.user = user;
      cart.cart_data = createCartDto.cart_data;
      cart = await this.cartRepository.save(cart);
    }
  
    return cart;
  }
  

  async getUserCart(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userCart = await this.cartRepository
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getOne();

    if (!userCart || !userCart.cart_data || userCart.cart_data.length === 0) {
      throw new NotFoundException('No items found in the cart for this user');
    }

    let totalPrice = 0;

    for (const item of userCart.cart_data) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }

    return {
      message: 'User cart fetched successfully',
      totalPrice,
      cartData: userCart.cart_data,
    };
  }

  async clearCart(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.cartRepository.delete({ user: user });
  }
}
