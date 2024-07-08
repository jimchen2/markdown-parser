import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this document.'],
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
      },
    type: {
      type: String,
      default: '',
      required: true
    },
    access: {
      type: Number,
      enum: [1, 2, 3],
      required: true,
      default: 2
    },
    body: {
      type: String,
      default: '',
    },
  },
);

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema, 'documents');

