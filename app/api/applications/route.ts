import { NextResponse } from 'next/server';
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { jobId, position, name, email, coverLetter } = await req.json();

    // Here you would typically save the data to your database
    // const application = await prisma.application.create({
    //   data: {
    //     jobId,
    //     position,
    //     name,
    //     email,
    //     coverLetter,
    //   },
    // });

    // For now, we'll just log it
    console.log("Application received:", { jobId, position, name, email, coverLetter });

    return NextResponse.json({ message: "Application received successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving application:", error);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }
}
