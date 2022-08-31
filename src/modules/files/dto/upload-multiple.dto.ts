import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray } from "class-validator";

export class FilesUploadDto {
    @ArrayNotEmpty()
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    files: any[];
}
  