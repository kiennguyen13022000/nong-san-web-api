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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
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
@ApiForbiddenResponse({ description: 'Không có quyền truy cập' })
@Controller('admin/banners')
export class AdminBannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @ApiBody({ type: CreateBannerDto })
  @ApiOperation({
    summary: 'Tạo banner mới',
    operationId: 'create',
  })
  @ApiOkResponse({ description: 'Tạo banner thành công' })
  @ApiBadRequestResponse({ description: 'Tạo banner thất bại' })
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
  @ApiOperation({
    summary: 'Lấy danh sách banner',
    operationId: 'findAll',
  })
  @ApiOkResponse({ description: 'Lấy danh sách banner thành công' })
  @ApiBadRequestResponse({ description: 'Lấy danh sách banner thất bại' })
  async findAll() {
    const banners = await this.bannersService.findAll();
    return new ResponseData(true, banners, null);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lấy thông tin banner',
    operationId: 'findOne',
  })
  @ApiOkResponse({ description: 'Lấy thông tin banner thành công' })
  @ApiBadRequestResponse({ description: 'Lấy thông tin banner thất bại' })
  async findOne(@Param('id') id: string) {
    const banner = await this.bannersService.findOne(id);
    return new ResponseData(true, banner, null);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Sửa thông tin banner',
    operationId: 'update',
  })
  @ApiOkResponse({ description: 'Cập nhật banner thành công' })
  @ApiBadRequestResponse({ description: 'Cập nhật banner thất bại' })
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
  @ApiOperation({
    summary: 'Đổi trạng thái hiển thị banner',
    operationId: 'toggleDisplay',
  })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Đổi trạng thái hiển thị banner thành công' })
  @ApiBadRequestResponse({
    description: 'Đổi trạng thái hiển thị banner thất bại',
  })
  async toggleDisplay(
    @Param('id') id: string,
    @Body() toggleDisplayDto: ToggleDisplayDto,
  ) {
    await this.bannersService.toggleDisplay(id, toggleDisplayDto);
    return new ResponseData(
      true,
      {
        message: 'Đổi trạng thái hiển thị banner thành công',
      },
      null,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Xóa banner',
    operationId: 'remove',
  })
  @ApiOkResponse({ description: 'Xóa banner thành công' })
  @ApiBadRequestResponse({ description: 'Xóa banner thất bại' })
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
