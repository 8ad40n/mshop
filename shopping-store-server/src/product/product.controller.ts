import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Request() req) {
    const userEmail = req.user.email;
    return this.productService.createProduct(createProductDto, userEmail);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
    @Request() req: any,
  ) {
    return this.productService.updateProduct(
      id,
      updateProductDto,
      req.user.email,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: any) {
    await this.productService.deleteProduct(id, req.user.email);
    return { message: 'Product deleted successfully' };
  }

  @Post('search')
  async search(@Body() body: { keyword: string }) {
    const { keyword } = body;
    return this.productService.search(keyword);
  }
  
}
