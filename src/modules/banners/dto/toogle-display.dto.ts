import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ToggleDisplayDto {
  @ApiProperty({ required: true })
  @IsBoolean()
  isShown: boolean;
}
