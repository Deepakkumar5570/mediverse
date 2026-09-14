"use server";

import { requireAdmin } from "@/src/lib/auth/require-admin";
import { supabaseServer } from "@/src/lib/supabase/server";

const BUCKET_NAME = "content-media";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

type AllowedImageType = keyof typeof ALLOWED_IMAGE_TYPES;

export async function uploadContentImageAction(file: File) {
  await requireAdmin();

  if (!(file instanceof File)) {
    throw new Error("Invalid image file.");
  }

  if (!file.size) {
    throw new Error("Image file is empty.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Image size must be 5 MB or smaller.");
  }

  const mimeType = file.type as AllowedImageType;

  if (!(mimeType in ALLOWED_IMAGE_TYPES)) {
    throw new Error(
      "Unsupported image type. Please use JPEG, PNG, or WebP.",
    );
  }

  const extension = ALLOWED_IMAGE_TYPES[mimeType];

  const fileName = `${crypto.randomUUID()}.${extension}`;
  const filePath = `articles/${fileName}`;

  const fileBuffer = await file.arrayBuffer();

  const { error } = await supabaseServer.storage
    .from(BUCKET_NAME)
    .upload(filePath, fileBuffer, {
      contentType: mimeType,
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    console.error("Content image upload failed:", error);

    throw new Error("Failed to upload image.");
  }

  const {
    data: { publicUrl },
  } = supabaseServer.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return {
    url: publicUrl,
    path: filePath,
  };
}