import { ApiProperty } from '@nestjs/swagger';

export class UploadGalleryDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'file',
    },
  })
  gallery: any[];
}
