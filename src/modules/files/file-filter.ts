import { HttpStatus, UnsupportedMediaTypeException } from '@nestjs/common';
import { Express } from 'express';
export function mediaFileFilter(...mimetypes: string[]) {
  return (
    req,
    file: Express.Multer.File,
    callback: (error: Error, acceptFile: boolean) => void,
  ) => {
    const isAllowedExtension = mimetypes.some((mt) =>
      file.mimetype.includes(mt),
    );
    if (isAllowedExtension) {
      return callback(null, true);
    }

    callback(
      new UnsupportedMediaTypeException({
        success: false,
        payload: null,
        error: {
          status: HttpStatus.BAD_REQUEST,
          message: 'File ảnh không hợp lệ!',
        },
      }),
      false,
    );
  };
}
