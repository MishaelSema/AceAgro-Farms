import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image: string;
  productCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String, required: true },
  productCount: { type: Number, default: 0 },
}, { timestamps: true });

function getCategoryModel(): Model<ICategory> {
  return mongoose.models.Category as Model<ICategory> || mongoose.model<ICategory>('Category', CategorySchema);
}

export default getCategoryModel();
