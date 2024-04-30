import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CatalogMongo } from "../../data/schemas/CatalogSchema";
import { Model } from "mongoose";
import { CatalogSchema } from "../../data/catalogs-entity/catalogs-entity";
import { IRepository, SortType } from '../../../../@shared/IRepository';

@Injectable()
export class CatalogsRepository implements IRepository<CatalogSchema> {

    constructor(
        @InjectModel(CatalogMongo.name)
        private model: Model<CatalogMongo>,
    ) { }
    listarTodos(sort?: Record<string, SortType>[]): Promise<CatalogSchema[]> {
        return this.model.find().exec();
    }
    async listarTodosPorCondicional(condition: string | Record<string, unknown>, sort?: Record<string, SortType>[]): Promise<CatalogSchema[]> {
        return this.model.find({ condition }).exec();
    }
    buscarPorId(id: string | number | Record<string, unknown>): Promise<CatalogSchema> {
        return this.model.findOne({ id }).exec();
    }
    async salvarTodos(entities: CatalogSchema[]): Promise<void> {
        entities.forEach(entity => {
            const a = new this.model(entity);
            a.save();
        });
    }
    async salvarOuAtualizarPorId(entity: CatalogSchema, id?: Record<string, unknown>): Promise<void> {
        if (this.existPorId(entity.id)) {
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
