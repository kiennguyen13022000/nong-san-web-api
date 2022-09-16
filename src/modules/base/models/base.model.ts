import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";

@Injectable()
export class BaseModel {
    public model: Model<any>;

    /**
     * create
     */
    public create(payload: Object) {
        return this.model.create(payload);
    }

    /**
     * update
     */
    public update(payload: Object, id: Types.ObjectId) {
        return this.model.findByIdAndUpdate(id, payload).exec();
    }

    /**
     * createOrUpdate
     */
    public async createOrUpdate(payload: Object, where: Object) {
        return this.model.updateOne(where, payload, { new: true, upsert: true });
    }

    /**
     * delete
     */
    public async delete(id: Types.ObjectId) {
        return await this.model.findByIdAndDelete(id).exec();
    }

    /**
     * findById
     */
    public async findById(select: Array<string>, id: Types.ObjectId, populate: any = null) {
        return await this.model.findById(id).select(select).populate(populate).exec();
    }

    /**
     * findWhere
     */
    public async findWhere(select: Array<string>, where: Object, populate: any = null) {
        return await this.model.find(where).select(select).populate(populate).exec();
    }

   /**
    * findOneWhere
    */
    public async findOneWhere(select: Array<string>, where: Object, populate: any = null) {
        return await this.model.findOne(where).select(select).populate(populate).exec();
    }

    /**
     * exists
     */
    public exists(where: Object) {
        return this.model.exists(where);
    }

}