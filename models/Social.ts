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

const Social: Model<ISocial> = mongoose.models.Social || mongoose.model<ISocial>('Social', SocialSchema);
export default Social;
