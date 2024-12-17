import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createProduct(createProductDto: CreateProductDto, email: string): Promise<Product> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user || user.role !== 'Admin') {
      throw new ForbiddenException('You do not have permission to perform this action');
    }
    const product = await this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(id: string, updateProductDto: CreateProductDto, email: string): Promise<Product> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user || user.role !== 'Admin') {
      throw new ForbiddenException('You do not have permission to perform this action');
    }

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: string, email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user || user.role !== 'Admin') {
      throw new ForbiddenException('You do not have permission to perform this action');
    }

    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.remove(product);
  }

  async search(keyword: string) {
    return this.productRepository
            .createQueryBuilder('p')
            .where('p.title LIKE :keyword', { keyword: `%${keyword}%` })
            .getMany();
  }

}
