import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  await connectDB();
  const { name } = await req.json();

  const slug = name.toLowerCase().replace(/\s+/g, "-");

  
  const existing = await Category.findOne({ slug });
  if (existing) return NextResponse.json(existing);

  const category = await Category.create({ name, slug });
  return NextResponse.json(category);
}
