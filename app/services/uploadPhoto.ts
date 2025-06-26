export async function uploadPhoto(file: Blob): Promise<string> {
  const uploadForm = new FormData();
  uploadForm.append("photo", file);
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/upload-photo`,
    { method: "POST", body: uploadForm }
  );
  const data = await res.json();
  if (!res.ok || !data.imageUrl) throw new Error("Failed to upload photo");
  return data.imageUrl;
}
