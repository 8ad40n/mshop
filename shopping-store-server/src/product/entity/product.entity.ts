import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
  
  @Entity('products')
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({
      type: 'varchar',
      length: 255,
      nullable: false,
    })
    title: string;
  
    @Column({
      type: 'text',
      nullable: true,
    })
    description: string;
  
    @Column({
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    })
    price: number;
  
    @Column({
      type: 'int',
      default: 0,
      nullable: false,
    })
    inStock: number;
  
    @Column({
      type: 'varchar',
      length: 255,
      nullable: false,
    })
    category: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  