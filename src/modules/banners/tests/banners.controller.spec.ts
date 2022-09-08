import { Test, TestingModule } from '@nestjs/testing';
import { AdminBannersController } from '../controllers/admin-banners.controller';
import { BannersService } from '../services/banners.service';

describe('BannersController', () => {
  let controller: AdminBannersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminBannersController],
      providers: [BannersService],
    }).compile();

    controller = module.get<AdminBannersController>(AdminBannersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
