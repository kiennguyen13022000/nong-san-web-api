import { Test, TestingModule } from '@nestjs/testing';
import { BannerImagesService } from '../services/banner-images.service';

describe('BannerImagesService', () => {
  let service: BannerImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannerImagesService],
    }).compile();

    service = module.get<BannerImagesService>(BannerImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
