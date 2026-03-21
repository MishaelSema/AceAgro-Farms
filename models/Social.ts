import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISocial extends Document {
  platform: 'facebook' | 'twitter' | 'instagram' | 'youtube' | 'whatsapp' | 'tiktok';
  value: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SocialSchema = new Schema({
  platform: { 
    type: String, 
    required: true, 
    unique: true,
    enum: ['facebook', 'twitter', 'instagram', 'youtube', 'whatsapp', 'tiktok'] 
  },
  value: { type: String, required: true },
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

const SOCIAL_NAME = 'Social';

export const Social: Model<ISocial> = 
  (mongoose as any).models?.[SOCIAL_NAME] as Model<ISocial> ||
  mongoose.model<ISocial>(SOCIAL_NAME, SocialSchema);

export default Social;
