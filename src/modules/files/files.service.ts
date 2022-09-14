import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { copyFile, rm } from 'fs/promises';
import { basename, join } from 'path';

@Injectable()
export class FilesService {
  async copy(file: string, to: string) {
    try {
      const filename = basename(file);
      const srcPath = join('public', file);
      if (!existsSync(srcPath)) {
        throw new HttpException(
          {
            message: 'Copy file thất bại',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const destPath = join('public', to);
      if (!existsSync(destPath)) {
        mkdirSync(destPath, { recursive: true });
      }

      const destFullPath = join(destPath, filename);
      await copyFile(srcPath, destFullPath);
      return destFullPath.replace('public', '');
    } catch (error) {
      throw new HttpException(
        {
          error: 'Copy file thất bại',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async delete(file: string) {
    try {
      const path = join('public', file);
      if (!existsSync(path)) {
        throw new HttpException(
          {
            error: `Xóa file ${file} thất bại`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await rm(path);
    } catch (error) {
      throw new HttpException(
        {
          error: `Xóa file ${file} thất bại`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteMultiple(files: string[]) {
    await Promise.all(files.map(async (file) => await this.delete(file)));
  }
}
