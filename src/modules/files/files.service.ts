import { Injectable } from '@nestjs/common';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { basename, join } from 'path';

@Injectable()
export class FilesService {
  copy(from: string, to: string) {
    try {
      const filename = basename(from);
      const srcPath = join('public', from);
      if (!existsSync(srcPath)) {
        return;
      }

      const destPath = join('public', to);
      if (!existsSync(destPath)) {
        mkdirSync(destPath, { recursive: true });
      }

      const destFullPath = join(destPath, filename);
      copyFileSync(srcPath, destFullPath);
      return destFullPath.replace('public', '');
    } catch (error) {
      return;
    }
  }
}
