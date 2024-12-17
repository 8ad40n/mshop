import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsEnum(['pending', 'confirmed'])
  @IsNotEmpty()
  status: 'pending' | 'confirmed';
}
