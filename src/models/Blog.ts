import mongoose, { Schema, models } from "mongoose";

const BlogSchema = new Schema(
  {
    
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    author: {
      type: String,
      default: "Shubham",
    },

    category: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },
    views: {
  type: Number,
  default: 0,
},


    
    excerpt: {
      type: String,
      required: true,
      maxlength: 300,
    },

    content: {
      type: String,
      required: true, 
    },

    featuredImage: {
      type: String,
      required: true,
    },

 
    seo: {
      metaTitle: {
        type: String,
        maxlength: 60,
      },
      metaDescription: {
        type: String,
        maxlength: 160,
      },
      canonicalUrl: {
        type: String,
      },
    },

  
    og: {
      title: String,
      description: String,
      image: String,
    },

    faqs: [
      {
        question: String,
        answer: String,
      },
    ],

   
    internalLinks: {
      type: [String], // slugs
      default: [],
    },

    
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },

    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }

);

export default models.Blog || mongoose.model("Blog", BlogSchema);
