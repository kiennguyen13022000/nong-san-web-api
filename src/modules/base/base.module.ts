import { Module } from '@nestjs/common';
import { BaseModel } from './models/base.model';
import { BaseService } from './services/base.service';

@Module({
    providers: [BaseService, BaseModel],
    exports: [BaseService, BaseModel]
})
export class BaseModule {}
