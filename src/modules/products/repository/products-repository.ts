import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { ProductSchema } from "../data/products-entity";
import { ProductMongo } from "../data/schemas/ProductSchema";
import { IRepository, SortType } from '../../../@shared/IRepository';


@Injectable()
export class ProductsRepository implements IRepository<ProductSchema> {
    constructor(
        @InjectModel(ProductMongo.name)
        private model: Model<ProductMongo>,
    ) { }
    listarTodos(sort?: Record<string, SortType>[]): Promise<ProductSchema[]> {
        return this.model.find().exec();
    }
    async listarTodosPorCondicional(condition: string | Record<string, unknown>, sort?: Record<string, SortType>[]): Promise<ProductSchema[]> {
        return this.model.find({ condition }).exec();
    }
    buscarPorId(id: string | number | Record<string, unknown>): Promise<ProductSchema> {
        return this.model.findOne({ id }).exec();
    }
    async salvarTodos(entities: ProductSchema[]): Promise<void> {
        entities.forEach(entity => {
            const a = new this.model(entity);
            a.save();
        });
    }
    async salvarOuAtualizarPorId(entity: ProductSchema, id?: Record<string, unknown>): Promise<void> {
        if (this.existPorId(entity._id)) {
            this.model.updateOne({ id }).exec();
            return;
        }
        const a = new this.model(entity);
        a.save();

    }
    async existPorId(id: string | number | Record<string, unknown>): Promise<boolean> {
        return !!this.model.findOne({ id }).exec();
    }
    async totalizar(): Promise<number> {
        return (await this.model.find().exec())?.length ?? 0;
    }
    async removerTodos(): Promise<void> {
        new this.model().depopulate();
    }
    async removerTodosPorCondicional(condition: string | Record<string, unknown>): Promise<void> {
        this.model.deleteMany({ condition }).exec();
    }
    async removerPorId(id: string | number | Record<string, unknown>): Promise<void> {
        new this.model(id).deleteOne();
    }

}
