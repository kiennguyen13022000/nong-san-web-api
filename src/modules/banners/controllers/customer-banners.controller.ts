import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ResponseData from 'src/helpers/response-data';
import { BannersService } from '../services/banners.service';

@ApiTags('[Customer] Banner')
@Controller('customer/banners')
export class CustomerBannersController {
  constructor(private bannersService: BannersService) {}

  @Get()
  async showBanners() {
    const banners = await this.bannersService.findAllShown();
    return new ResponseData(true, banners, null);
  }
}
