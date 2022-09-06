import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MAXIMUM_NUMBER_FILE_UPLOAD } from 'src/configs/constants';
import ResponseData from 'src/helpers/ResponseData';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilesUploadDto } from './dto/upload-multiple.dto';
import { UploadSingleDto } from './dto/upload-single.dto';
import { allowExtensions } from './files.config';

@ApiTags('[Upload] Api liên quan đến upload file')
@Controller('files')
export class FilesController {
  @UseGuards(JwtAuthGuard)
  @Post('single-upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', allowExtensions()))
  @ApiBearerAuth()
  @ApiBody({
    description: 'file tải lên',
    type: UploadSingleDto,
  })
  @ApiCreatedResponse({ description: 'Thực hiện thành công' })
  @ApiBadRequestResponse({ description: 'Yêu cầu không thành công' })
  upload(@UploadedFile() file: Express.Multer.File) {
    return new ResponseData(
      true,
      {
        message: 'Upload thành công',
        data: {
          path: file.path,
        },
      },
      null,
    );
  }

  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', MAXIMUM_NUMBER_FILE_UPLOAD, allowExtensions()),
  )
  @ApiBearerAuth()
  @ApiBody({
    description: 'Danh sách file tải lên',
    type: FilesUploadDto,
  })
  @ApiCreatedResponse({ description: 'Thực hiện thành công' })
  @ApiBadRequestResponse({ description: 'Yêu cầu không thành công' })
  @Post('multiple-upload')
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    const paths = [];
    files.forEach((file, index) => {
      paths[index] = file.path;
    });

    return new ResponseData(
      true,
      {
        message: 'Upload thành công',
        data: paths,
      },
      null,
    );
  }
}
