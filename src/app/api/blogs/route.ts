import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { Types } from "mongoose";


  //GET: list OR single

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const isAdmin = searchParams.get("admin") === "true";

    //GET blog by ID
    if (id && Types.ObjectId.isValid(id)) {
      const blog = await Blog.findById(id).lean();
      return NextResponse.json(blog);
    }

    //GET blogs list
    const blogs = await Blog.find(
      isAdmin ? {} : { status: "published" }
    )
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("BLOG GET API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// //POST: create blog

// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const blog = await Blog.create(body);
//     return NextResponse.json(blog, { status: 201 });
//   } catch (error) {
//     console.error("BLOG CREATE ERROR:", error);
//     return NextResponse.json(
//       { error: "Failed to create blog" },
//       { status: 500 }
//     );
//   }
// }
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    console.log("BLOG POST BODY 👉", body);

    const blog = await Blog.create(body);
    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error("BLOG CREATE ERROR ❌", error.message);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}



  //PUT: update blog

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid blog ID" },
        { status: 400 }
      );
    }

    await Blog.findByIdAndUpdate(id, body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BLOG UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}


  //DELETE: remove blog

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid blog ID" },
        { status: 400 }
      );
    }

    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BLOG DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
