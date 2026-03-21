import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  title: string;
  description?: string;
  image: string;
  category: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['farm', 'products', 'events', 'team', 'other'],
    default: 'farm' 
  },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.GalleryItem || mongoose.model<IGalleryItem>('GalleryItem', GallerySchema);
