import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { toFile } from "openai";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload an image." },
        { status: 400 }
      );
    }

    // Convert uploaded file to buffer (no file system write)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Get helmet image from public directory
    const helmetPath = path.join(process.cwd(), "public", "helmet.png");

    if (!fs.existsSync(helmetPath)) {
      return NextResponse.json(
        { error: "Helmet image not found" },
        { status: 500 }
      );
    }

    // Read helmet image to buffer
    const helmetBuffer = fs.readFileSync(helmetPath);

    const imageFiles = [helmetBuffer, helmetPath];
    // Convert buffers to OpenAI File objects
    const userImage = await toFile(buffer, "user-image.png", {
      type: "image/png",
    });

    const helmetImage = await toFile(helmetBuffer, "helmet.png", {
      type: "image/png",
    });

    const prompt = `
    Put the character from the profile picture inside the helmet image. 
    If there is no visible body in the profile picture, please create an appropriate body based on the image I upload. The neck and shoulders should also match the body being created.
    that fits with the character and the helmet. Make it look natural and well-integrated.
    The final result must be the character wearing or inside the helmet.
    `;

    // Use OpenAI to edit the image
    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: [userImage, helmetImage],
      prompt: prompt,
      quality: "medium", // Adjust quality as needed
    });

    const imageData = response.data?.[0]?.b64_json;

    if (!imageData) {
      return NextResponse.json(
        { error: "No image data received from OpenAI" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      image: imageData,
    });
  } catch (error) {
    console.error("Error generating profile:", error);
    return NextResponse.json(
      {
        error: "Failed to generate profile picture",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
