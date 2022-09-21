import { ApiProperty } from '@nestjs/swagger';

export class UploadMediaDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'file',
    },
  })
  media: any[];
}
