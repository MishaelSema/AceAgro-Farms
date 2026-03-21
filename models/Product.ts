import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: 'produce' | 'wellness' | 'animal' | 'fish';
  description: string;
  shortDescription: string;
  healthBenefits: string[];
  productionMethod: string;
  price: number;
  unit: string;
  image: string;
  gallery: string[];
  inStock: boolean;
  featured: boolean;
  organic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    enum: ['produce', 'wellness', 'animal', 'fish'],
    required: true 
  },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  healthBenefits: [{ type: String }],
  productionMethod: { type: String, default: 'Organic Farming' },
  price: { type: Number, required: true },
  unit: { type: String, required: true },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  organic: { type: Boolean, default: true },
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
