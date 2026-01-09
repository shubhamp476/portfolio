import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    description: String,
    image: String,
    tech: [String],
    content: String,
    live: String,
    github: String,
    status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
