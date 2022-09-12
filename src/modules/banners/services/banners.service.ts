import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { existsSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { NOT_FOUND_IMAGE } from 'src/configs/constants';
import { CreateBannerDto } from '../dto/create-banner.dto';
import { ToggleDisplayDto } from '../dto/toogle-display.dto';
import { UpdateBannerDto } from '../dto/update-banner.dto';
import { EBannerModel } from '../enums/banner-model.enum';
import { BannerDocument } from '../schemas/banner.schema';
import { BannerImagesService } from './banner-images.service';

@Injectable()
export class BannersService {
  constructor(
    @InjectModel(EBannerModel.BANNER)
    private bannerModel: Model<BannerDocument>,
    private bannerImagesService: BannerImagesService,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    const { image: tmpImage, ...rest } = createBannerDto;
    const newImage = await this.bannerImagesService.create(tmpImage);
    const newBanner = { ...rest, image: newImage };
    return this.bannerModel.create(newBanner);
  }

  async findAll() {
    return this.bannerModel.find({}).sort('-createdAt').select('-image').lean();
  }

  async findAllShown() {
    const banners = await this.bannerModel
      .find({ isShown: true })
      .select('-isShown')
      .populate(['image'])
      .lean();
    for (const banner of banners) {
      if (!existsSync(join('public', banner.image.url))) {
        banner.image.url = NOT_FOUND_IMAGE;
      }
    }

    return banners;
  }

  async findOne(id: string) {
    const banner = await this.bannerModel
      .findById(id)
      .populate(['image'])
      .lean();
    if (!existsSync(join('public', banner.image.url))) {
      banner.image.url = NOT_FOUND_IMAGE;
    }

    return banner;
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    const { removeImage, image, ...rest } = updateBannerDto;
    const [newImage, ,] = await Promise.all([
      this.bannerImagesService.create(image),
      this.bannerImagesService.remove(removeImage),
    ]);

    const updatedBanner = {
      ...rest,
      image: newImage,
      isShown: true,
    };

    return this.bannerModel.findByIdAndUpdate(id, updatedBanner);
  }

  async toggleDisplay(id: string, toggleDisplayDto: ToggleDisplayDto) {
    return this.bannerModel.findByIdAndUpdate(id, toggleDisplayDto);
  }

  async remove(id: string) {
    return this.bannerModel.findByIdAndRemove(id);
  }
}
