import mongoose from 'mongoose';

const TempContentSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.TempContent || mongoose.model('TempContent', TempContentSchema);