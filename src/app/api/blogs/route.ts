import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { Types } from "mongoose";

// Get → List of blogs (ADMIN + PUBLIC + SEARCH + CATEGORY)
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    const isAdmin = searchParams.get("admin") === "true";
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    /* ===============================
       1️⃣ ADMIN: Get blog by ID
    =============================== */
    if (id && Types.ObjectId.isValid(id)) {
      const blog = await Blog.findById(id).lean();
      return NextResponse.json(blog);
    }

    /* ===============================
       2️⃣ FILTER BUILDING
    =============================== */
    const filter: any = isAdmin ? {} : { status: "published" };

    // Category filter
    if (category && category !== "all") {
      filter.category = category;
    }

    // Search filter (title + excerpt)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    /* ===============================
       3️⃣ BLOG LIST
    =============================== */
    const blogs = await Blog.find(
      filter,
      {
        title: 1,
        slug: 1,
        excerpt: 1,
        featuredImage: 1,
        tags: 1,
        category: 1,
        createdAt: 1,
        status: 1,
        views: 1,
        content: 1, // needed for reading time
      }
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


// Post → Create new blog
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

// Put → Update existing blog
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

// Delete → DELETE BLOG
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
