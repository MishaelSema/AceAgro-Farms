import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  readTime: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: 'ACE AGRO FARMS' },
  readTime: { type: Number, default: 5 },
  published: { type: Boolean, default: true },
}, { timestamps: true });

const BLOGPOST_NAME = 'BlogPost';

export const BlogPost: Model<IBlogPost> = 
  (mongoose as any).models?.[BLOGPOST_NAME] as Model<IBlogPost> ||
  mongoose.model<IBlogPost>(BLOGPOST_NAME, BlogPostSchema);

export default BlogPost;
