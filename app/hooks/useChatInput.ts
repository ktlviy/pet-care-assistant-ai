import { useRef, useState } from "react";

export function useChatInput() {
  const [input, setInput] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPrompt, setPhotoPrompt] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handlePhotoPromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoPrompt(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f && f.type.startsWith("image/")) {
      setPhoto(f);
      setPhotoPreview(URL.createObjectURL(f));
    }
  };

  const handleInputDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0] || null;
    if (f && f.type.startsWith("image/")) {
      setPhoto(f);
      setPhotoPreview(URL.createObjectURL(f));
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setPhotoPrompt("");
  };

  return {
    input,
    setInput,
    photo,
    setPhoto,
    photoPrompt,
    setPhotoPrompt,
    dragActive,
    setDragActive,
    photoPreview,
    setPhotoPreview,
    fileInputRef,
    handleInputChange,
    handlePhotoPromptChange,
    handleFileChange,
    handleInputDrop,
    removePhoto,
  };
}
