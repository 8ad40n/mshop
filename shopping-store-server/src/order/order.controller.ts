import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrderDto);
    return { message: 'Order placed successfully', order };
  }

  @UseGuards(AuthGuard)
  @Post('confirm/:orderId')
  async confirmOrder(@Request() req, @Param('orderId') orderId: string) {
    const userEmail = req.user.email;
    const updatedOrder = await this.orderService.confirmOrder(
      orderId,
      userEmail,
    );
    return { message: 'Order confirmed successfully', updatedOrder };
  }

  @Get('revenue')
  async getTotalConfirmedOrdersPrice() {
    const totalPrice = await this.orderService.getTotalConfirmedOrdersPrice();
    return { message: 'Total price of confirmed orders retrieved successfully', totalPrice };
  }

  @Get("allOrders")
  async getAllOrders() {
    const orders = await this.orderService.getAllOrders();
    return { message: "All orders retrieved successfully", orders };
  }
}
