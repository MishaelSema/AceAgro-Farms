import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';
import Social from '@/models/Social';

export async function getFooterData() {
  try {
    await dbConnect();
    const [categories, socials] = await Promise.all([
      Category.find().sort({ createdAt: -1 }).limit(5),
      Social.find({ enabled: true }),
    ]);
    return {
      categories: JSON.parse(JSON.stringify(categories)),
      socials: JSON.parse(JSON.stringify(socials)),
    };
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return { categories: [], socials: [] };
  }
}
