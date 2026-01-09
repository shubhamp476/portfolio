import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { Types } from "mongoose";

//GET
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const isAdmin = searchParams.get("admin") === "true";

  //Get project by ID
  if (id && Types.ObjectId.isValid(id)) {
    const project = await Project.findById(id).lean();
    return NextResponse.json(project);
  }

  //  Get project list
  const projects = await Project.find(
    isAdmin ? {} : { status: "published" }
  )
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json(projects);
}

//POST 
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const project = await Project.create(body);
  return NextResponse.json(project, { status: 201 });
}

// PUT 
export async function PUT(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();

  if (!id || !Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid project ID" },
      { status: 400 }
    );
  }

  await Project.findByIdAndUpdate(id, body);
  return NextResponse.json({ success: true });
}

//DELETE
export async function DELETE(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id || !Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid project ID" },
      { status: 400 }
    );
  }

  await Project.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
