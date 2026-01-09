import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    excerpt: String,        
    coverImage: String,
    content: String, 
    status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
    },       
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  
  { timestamps: true }
);

export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);
