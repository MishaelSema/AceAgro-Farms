import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['new', 'read', 'replied'],
    default: 'new' 
  },
}, { timestamps: true });

function getInquiryModel(): Model<IInquiry> {
  return mongoose.models.Inquiry as Model<IInquiry> || mongoose.model<IInquiry>('Inquiry', InquirySchema);
}

export default getInquiryModel();
