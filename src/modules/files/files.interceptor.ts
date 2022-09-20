import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';
import { mediaFileFilter } from './file-filter';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const MAX_FILE_COUNT = 100;
const acceptImageExt = ['jpg', 'jpeg', 'png'];
const acceptVideoExt = ['mp4', 'mpeg'];
const acceptMediaExt = [...acceptImageExt, ...acceptVideoExt];

const fileUploadOptions = (extensions: string[]) => {
  const fileUploadOptions: MulterOptions = {
    storage: diskStorage({
      destination(req, file, callback) {
        const now = new Date();
        const tmpDir = `public/tmp/${
          file.fieldname
        }/${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
        if (!existsSync(tmpDir)) {
          mkdirSync(tmpDir, { recursive: true });
        }

        callback(null, tmpDir);
      },
      filename(req, file, callback) {
        const extension = extname(file.originalname);
        const filename = `${randomBytes(19).toString('hex')}${extension}`;
        callback(null, filename);
      },
    }),
    fileFilter: mediaFileFilter(...extensions),
  };

  return fileUploadOptions;
};
export const ThumbnailInterceptor = FileInterceptor(
  'thumbnail',
  fileUploadOptions(acceptImageExt),
);

export const MediaInterceptor = FilesInterceptor(
  'media',
  MAX_FILE_COUNT,
  fileUploadOptions(acceptMediaExt),
);
