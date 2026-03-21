import mongoose, { Schema, Document, Model } from 'mongoose';

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

function getGalleryItemModel(): Model<IGalleryItem> {
  return mongoose.models.GalleryItem as Model<IGalleryItem> || mongoose.model<IGalleryItem>('GalleryItem', GallerySchema);
}

export default getGalleryItemModel();
