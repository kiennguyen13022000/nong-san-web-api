import { Test, TestingModule } from '@nestjs/testing';
import { CustomerBannersController } from '../controllers/customer-banners.controller';

describe('CustomerBannersController', () => {
  let controller: CustomerBannersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerBannersController],
    }).compile();

    controller = module.get<CustomerBannersController>(
      CustomerBannersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
