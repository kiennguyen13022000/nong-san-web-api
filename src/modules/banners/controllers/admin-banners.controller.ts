import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { BannersService } from '../services/banners.service';
import { CreateBannerDto } from '../dto/create-banner.dto';
import { UpdateBannerDto } from '../dto/update-banner.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import ResponseData from 'src/helpers/response-data';
import { ToggleDisplayDto } from '../dto/toogle-display.dto';

@ApiTags('[Admin] Banner')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('admin/banners')
export class AdminBannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @ApiBody({ type: CreateBannerDto })
  @ApiOperation({
    summary: 'Tạo banner mới',
    description: 'Tạo banner mới',
    operationId: 'create',
  })
  async create(@Body() createBannerDto: CreateBannerDto) {
    const banner = await this.bannersService.create(createBannerDto);
    return new ResponseData(
      true,
      {
        message: 'Tạo banner thành công!',
        banner,
      },
      null,
    );
  }

  @Get()
  async findAll() {
    const banners = await this.bannersService.findAll();
    return new ResponseData(true, banners, null);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const banner = await this.bannersService.findOne(id);
    return new ResponseData(true, banner, null);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    await this.bannersService.update(id, updateBannerDto);
    return new ResponseData(
      true,
      {
        message: 'Cập nhật banner thành công',
      },
      null,
    );
  }

  @Patch('/:id/toggle-display')
  @ApiParam({ name: 'id' })
  async toggleDisplay(
    @Param('id') id: string,
    @Body() toggleDisplayDto: ToggleDisplayDto,
  ) {
    await this.bannersService.toggleDisplay(id, toggleDisplayDto);
    return new ResponseData(
      true,
      {
        message: 'Cập nhật banner thành công',
      },
      null,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.bannersService.remove(id);
    return new ResponseData(
      true,
      {
        message: 'Xóa banner thành công',
      },
      null,
    );
  }
}
