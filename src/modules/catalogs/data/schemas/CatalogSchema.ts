import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CatalogSchema } from "../catalogs-entity/catalogs-entity";
import { ProductSchema } from "../../../products/data/products-entity";
import * as mongoose from 'mongoose';

export type CatalogMongoDocument =
    mongoose.HydratedDocument<CatalogMongo>;

@Schema()
export class CatalogMongo implements CatalogSchema {

    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    id: string;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    ownerId: string;
    @Prop({ required: true })
    products: ProductSchema[];
    @Prop({ required: true })
    createdAt: number;
    @Prop()
    updatedAt?: number;
    @Prop()
    isDeleted?: boolean;

}

export const CatalogSchemaMongo = SchemaFactory.createForClass(CatalogMongo);