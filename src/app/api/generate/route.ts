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

    // Convert uploaded file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save uploaded file temporarily
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempFilePath = path.join(tempDir, `upload-${Date.now()}.png`);
    fs.writeFileSync(tempFilePath, buffer);

    // Get helmet image path
    const helmetPath = path.join(process.cwd(), "public", "helmet.png");

    if (!fs.existsSync(helmetPath)) {
      return NextResponse.json(
        { error: "Helmet image not found" },
        { status: 500 }
      );
    }

    const imageFiles = [tempFilePath, helmetPath];
    const images = await Promise.all(
      imageFiles.map(
        async (filePath) =>
          await toFile(fs.createReadStream(filePath), path.basename(filePath), {
            type: "image/png",
          })
      )
    );

    const prompt = `
    Put the character from the profile picture inside the helmet image. 
    If there is no visible body in the profile picture, please create an appropriate body 
    that fits with the character and the helmet. Make it look natural and well-integrated.
    The final result should show the character wearing or inside the helmet.
    `;

    // Use OpenAI to edit the image
    const response = await openai.images.edit({
      model: "gpt-image-1",
      image: images,
      prompt: prompt,
    });

    // Clean up temporary file
    fs.unlinkSync(tempFilePath);

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
