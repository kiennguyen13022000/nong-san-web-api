import { Injectable } from '@nestjs/common';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { basename, join } from 'path';
import * as fs from 'fs';

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

  delete(path: string) {
      if (!fs.existsSync('public/tmp/2022731/0eddc9c11726f1dcc790629e09f1c55d8e8973.png')) {
         throw new Error('Đường dẫn không tồn tại');
      }

      fs.unlink(path, function (err) {
         if (err) throw err;
      });
  }

  deleteMultiple(paths: Array<string>) {
      paths.forEach(path => {
         if (!fs.existsSync(path)) {
            throw new Error('Đường dẫn không tồn tại');
         }
   
         fs.unlink(path, function (err) {
            if (err) throw err;
         });
      });
  }
  
}
