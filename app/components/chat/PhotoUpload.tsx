import React, { useRef, useState } from "react";
import { Button } from "../ui/Button";
import { PhotoUploadProps } from "@/app/types/chat";

export default function PhotoUpload({
  onPhotoChange,
  disabled,
}: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleFile = (f: File | null) => {
    setFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
      onPhotoChange(f);
    } else {
      setPreview(null);
      onPhotoChange(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    handleFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0] || null;
    handleFile(f);
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div
        className={`w-40 h-40 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 transition-colors ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragActive(false);
        }}
        onDrop={handleDrop}
        tabIndex={0}
        role="button"
        aria-label="Upload photo"
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <span className="text-gray-400 text-center px-2">
            Drag & drop or click to upload a photo
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
      {file && (
        <Button size="sm" intent="secondary" onClick={() => handleFile(null)}>
          Remove Photo
        </Button>
      )}
    </div>
  );
}
