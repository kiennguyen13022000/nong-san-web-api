import { Test, TestingModule } from '@nestjs/testing';
import { AdminProductsController } from '../controllers/admin-products.controller';
import { ProductsService } from '../services/products.service';

describe('AdminProductsController', () => {
  let controller: AdminProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<AdminProductsController>(AdminProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
