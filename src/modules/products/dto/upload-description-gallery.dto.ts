import { ApiProperty } from '@nestjs/swagger';

export class UploadDescriptionGalleryDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'file',
    },
  })
  gallery: any[];
}
