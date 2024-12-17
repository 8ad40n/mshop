import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/order.dto';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const user = await this.userRepository.findOne({ where: { id: createOrderDto.user_id } });
    if (!user) throw new NotFoundException('User not found');

    const cart = await this.cartRepository.findOne({ where: { user: { id: user.id } } });
    if (!cart || cart.cart_data.length === 0) throw new NotFoundException('No cart data found for this user');

    let totalAmount = 0;
    const cartData = [];

    for (const item of cart.cart_data) {
      const product = await this.productRepository.findOne({ where: { id: item.productId } });
      if (!product) throw new NotFoundException(`Product with ID ${item.productId} not found`);

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      cartData.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        total: itemTotal,
      });
    }

    const order = new Order();
    order.user = user;
    order.status = 'pending';
    order.totalAmount = totalAmount;
    order.cart_data = cartData;
    order.shipping_address = createOrderDto.shipping_address;

    const savedOrder = await this.orderRepository.save(order);

    cart.cart_data = [];
    await this.cartRepository.save(cart);

    return savedOrder;
  }

  async confirmOrder(orderId: string, userEmail: string): Promise<Order> {
    const user = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!user || user.role !== 'Admin') throw new UnauthorizedException('Only admins can confirm orders');

    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

    for (const item of order.cart_data) {
      const product = await this.productRepository.findOne({ where: { id: item.productId } });
      if (!product) throw new NotFoundException(`Product with ID ${item.productId} not found`);

      if (product.inStock < item.quantity) {
        throw new Error(`Insufficient stock for product ID ${item.productId}`);
      }

      product.inStock -= item.quantity;
      await this.productRepository.save(product);
    }

    order.status = 'confirmed';
    return this.orderRepository.save(order);
  }


  async getTotalConfirmedOrdersPrice() {
    const confirmedOrders = await this.orderRepository.find({ where: { status: 'confirmed' } });
    
    let totalPrice = 0;
  
    for (const order of confirmedOrders) {
      totalPrice += Number(order.totalAmount); 
    }
  
    return {
      message: 'Total price of confirmed orders retrieved successfully',
      revenue: totalPrice, 
    };
  }
  
  async getAllOrders()
  {
    const orders = await this.orderRepository.find();
    return orders;
  }

}
