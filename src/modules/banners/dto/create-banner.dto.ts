import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';

export class BannerImageDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  url: string;
}

export class CreateBannerDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => [BannerImageDto] })
  @ValidateNested()
  images: BannerImageDto[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
