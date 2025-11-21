import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxlength: 200
  },
  featuredImage: {
    type: String
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  slug: {
    type: String,
    unique: true,
    sparse: true
  },
  published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

postSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Post', postSchema);
