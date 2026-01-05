import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

// ✅ GET all projects
export async function GET() {
  await connectDB();
  const projects = await Project.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

// ✅ POST add new project (admin)
export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();
  const project = await Project.create(data);
  return NextResponse.json(project);
}
