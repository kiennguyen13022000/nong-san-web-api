import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { BaseModel } from "../models/base.model";

@Injectable()
export class BaseService {
    protected baseModel: BaseModel;

    /**
     * create
     */
    public create(payload: Object) {
        return this.baseModel.create(payload);
    }

    /**
     * update
     */
    public update(payload: Object, id: Types.ObjectId) {
        return this.baseModel.update(payload, id);
    }

    /**
     * createOrUpdate
     */
    public createOrUpdate(payload: Object, where: Object) {
        return this.baseModel.createOrUpdate(payload, where);
    }

    /**
     * delete
     */
    public delete(id: Types.ObjectId) {
        return this.baseModel.delete(id);
    }

    /**
     * findById
     */
    public findById(select: Array<string> = [], id: Types.ObjectId, populate: any = null) {
        return this.baseModel.findById(select, id, populate);
    }

    /**
     * findWhere
     */
    public findWhere(select: Array<string> = [], where: Object, populate: any = null) {
        return this.baseModel.findWhere(select, where, populate);
    }

    /**
     * name
     */
    public findOneWhere(select: Array<string> = [], where: Object, populate: any = null) {
        return this.baseModel.findOneWhere(select, where, populate);
    }
    
}