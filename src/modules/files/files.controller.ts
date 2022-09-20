import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilesService } from './files.service';

@ApiTags('[Chung] Upload file')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
}
