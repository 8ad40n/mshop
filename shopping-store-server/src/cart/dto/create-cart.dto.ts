import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsArray()
  @IsNotEmpty()
  cart_data: { productId: string; quantity: number }[];
}
