import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class BannerImageDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  _id?: string;
}

export class CreateBannerDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: () => BannerImageDto })
  @ValidateNested()
  image: BannerImageDto;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsUrl()
  ref: string;
}
