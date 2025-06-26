import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("photo");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "No photo uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    const imageUrl = (uploadRes as { secure_url?: string }).secure_url;
    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to retrieve image URL from Cloudinary" },
        { status: 500 }
      );
    }
    return NextResponse.json({ imageUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to upload to Cloudinary" },
      { status: 500 }
    );
  }
}
