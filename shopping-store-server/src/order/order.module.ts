import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entity/cart.entity';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Cart, Product, User]),

  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
