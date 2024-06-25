import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this document.'],
      unique: true,
    },
    date: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    body: {
      type: String,
      default: '',
    },
  },
  { versionKey: false }
);

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema, 'documents');