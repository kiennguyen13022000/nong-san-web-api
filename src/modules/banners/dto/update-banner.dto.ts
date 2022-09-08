import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BannerImageDto, CreateBannerDto } from './create-banner.dto';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @ApiProperty({ type: () => BannerImageDto })
  @IsOptional()
  removeImage?: BannerImageDto;
}
