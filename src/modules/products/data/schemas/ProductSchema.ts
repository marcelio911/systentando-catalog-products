import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../products-entity';
import * as mongoose from 'mongoose';

export type ProductMongoDocument = mongoose.HydratedDocument<ProductMongo>;

@Schema()
export class ProductMongo implements Product {
  @Prop({ type: String })
  _id: string;
  @Prop({ type: String, required: true, unique: true })
  url: string;
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  supplier: string;

  @Prop()
  thumbnailUrl: URL;
  @Prop()
  imageUrl?: string[];

  @Prop()
  brand?: string;
  @Prop()
  model?: string;
  @Prop()
  color?: string;
  @Prop()
  weight?: number;
  @Prop()
  height?: number;
  @Prop()
  width?: number;
  @Prop()
  length?: number;
  @Prop()
  quantity?: number;

  @Prop()
  createdAt: number;
  @Prop()
  updatedAt?: number;
  @Prop()
  isDeleted?: boolean;
}

export const ProductMongoSchema = SchemaFactory.createForClass(ProductMongo);

ProductMongoSchema.pre('save', function (next) {
  if (this.url) {
    this._id = this.url;
  }
  console.log('ProductCatalogSchema.pre(save)::', this);

  return next();
});
