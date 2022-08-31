import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDocument } from '../schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel('admin') private adminModel: Model<AdminDocument>) {}

  async findOne(username: string) {
    return this.adminModel.findOne({ username });
  }
}
