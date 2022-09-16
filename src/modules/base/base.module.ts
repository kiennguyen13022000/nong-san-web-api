import { Module } from '@nestjs/common';
import { BaseModel } from './models/base.model';
import { BaseService } from './services/base.service';

@Module({
    providers: [BaseModel, BaseService],
    exports: [BaseService, BaseModel]
})
export class BaseModule {}
