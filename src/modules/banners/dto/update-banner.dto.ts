import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BannerImageDto, CreateBannerDto } from './create-banner.dto';

export class UpdateBannerDto extends CreateBannerDto {
  @ApiProperty({ type: () => BannerImageDto })
  @IsOptional()
  removeImage?: BannerImageDto;
}
