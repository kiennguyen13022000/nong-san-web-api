import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ValidateNested } from 'class-validator';
import { BannerImageDto, CreateBannerDto } from './create-banner.dto';

export class UpdateBannerDto extends CreateBannerDto {
  @ApiProperty({ type: () => BannerImageDto, required: false })
  @IsOptional()
  @ValidateNested()
  removeImage?: BannerImageDto;
}
