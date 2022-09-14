import { Module } from '@nestjs/common';
import { FilesService } from './services/files.service';
import { FilesController } from './controllers/files.controller';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
