import { Visitor } from "@/model/visitor-model";
import { Testimonial } from "@/model/testimonial-model"; // ✅ using Testimonial (not Review)
import { User } from "@/model/user-model";
import { Blog } from "@/model/blog-model";
import { Project } from "@/model/project-model";
import { Skill } from "@/model/skill-model";
import { Experience } from "@/model/experience-model";
import { dbConnect } from "@/service/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Run queries in parallel
    const [
      totalVisitors,
      totalReviews,
      avgRating,
      totalUsers,
      totalBlogs,
      totalProjects,
      totalSkills,
      currentWork
    ] = await Promise.all([
      Visitor.countDocuments(),
      Testimonial.countDocuments({ status: "approved" }), // only approved
      Testimonial.aggregate([
        { $match: { status: "approved" } },
        { $group: { _id: null, avg: { $avg: "$rating" } } }
      ]),
      User.countDocuments(),
      Blog.countDocuments({ status: "Published" }),
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.findOne({ status: "Ongoing" }).lean()
    ]);

    return NextResponse.json({
      totalVisitors,
      totalReviews,
      avgRating: avgRating[0]?.avg || 0,
      totalUsers,
      totalBlogs,
      totalProjects,
      totalSkills,
      currentWork: currentWork
        ? {
            designation: currentWork.designation,
            company: currentWork.company,
            status: currentWork.status,
          }
        : null
    });
  } catch (err) {
    console.error("Overview API Error:", err);
    return NextResponse.json({ error: "Failed to load overview" }, { status: 500 });
  }
}
