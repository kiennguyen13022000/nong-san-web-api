import { ApiProperty } from '@nestjs/swagger';

export class UploadThumbnailDto {
  @ApiProperty({
    type: 'file',
  })
  thumbnail: any;
}
