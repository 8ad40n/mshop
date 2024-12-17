import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entity/cart.entity';
import { Order } from './order/entity/order.entity';
import { OrderModule } from './order/order.module';
import { Product } from './product/entity/product.entity';
import { ProductModule } from './product/product.module';
import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'Shop',
    entities: [User, Product, Cart, Order],
    synchronize: true,
    // logging: true,
  }), UserModule, AuthModule, ProductModule, CartModule, OrderModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
