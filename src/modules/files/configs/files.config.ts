import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomBytes } from 'crypto';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const allowExtensions = () => {
  const fileUploadOptions: MulterOptions = {
    storage: diskStorage({
      destination(req, file, callback) {
        const now = new Date();
        const tmpDir = `public/tmp/${now.getFullYear()}${now.getMonth()}${now.getDate()}`;
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
  };

  return fileUploadOptions;
};
