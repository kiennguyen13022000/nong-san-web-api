import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { allowExtensions } from 'src/modules/files/files.config';

const MAX_FILE_COUNT = 100;
const acceptImageExt = ['jpg', 'jpeg', 'png'];
const acceptVideoExt = ['mp4', 'mpeg'];
const acceptMediaExt = [...acceptImageExt, ...acceptVideoExt];

export const ThumbnailInterceptor = FileInterceptor(
  'thumbnail',
  allowExtensions(acceptImageExt),
);

export const GalleryInterceptor = FilesInterceptor(
  'gallery',
  MAX_FILE_COUNT,
  allowExtensions(acceptMediaExt),
);
