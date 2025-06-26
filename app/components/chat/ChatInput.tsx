import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useChatInput } from "../../hooks/useChatInput";
import { ChatInputProps } from "@/app/types/chat";
import clsx from "clsx";

export default function ChatInput({
  loading,
  onSendText,
  onSendPhoto,
}: ChatInputProps) {
  const {
    input,
    setInput,
    photo,
    dragActive,
    setDragActive,
    photoPreview,
    fileInputRef,
    handleInputChange,
    handleFileChange,
    handleInputDrop,
    removePhoto,
  } = useChatInput();

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (photo && onSendPhoto) {
      onSendPhoto(photo);
      removePhoto();
    } else if (input.trim() && onSendText) {
      onSendText(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 border-t bg-white relative"
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragActive(false);
      }}
      onDrop={handleInputDrop}
    >
      <Input
        type="text"
        className={clsx(
          "flex-1 w-full",
          dragActive ? " border-blue-500 ring-2 ring-blue-200" : ""
        )}
        placeholder={
          photo
            ? "Add a prompt or description (optional)"
            : "Type your question..."
        }
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) handleSubmit();
        }}
        disabled={loading}
        autoFocus
        onBlur={() => setDragActive(false)}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={loading}
      />
      <Button
        type="button"
        intent="outline"
        size="md"
        className="flex-shrink-0"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        aria-label="Attach photo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m7.5 0V5.25M8.25 9V5.25m0 0A2.25 2.25 0 0110.5 3h3a2.25 2.25 0 012.25 2.25M12 15v6m0 0l-3-3m3 3l3-3"
          />
        </svg>
      </Button>
      <Button
        type="submit"
        size="md"
        intent="primary"
        loading={loading}
        disabled={loading || (!photo && !input.trim())}
        className="flex-shrink-0"
      >
        {photo ? "Send Photo" : "Send"}
      </Button>
      {photo && photoPreview && (
        <div className="absolute left-0 right-0 bottom-full mb-2 flex items-center gap-4 px-4 py-2 border bg-gray-50 rounded-lg shadow">
          <img
            src={photoPreview}
            alt="Preview"
            className="w-16 h-16 object-cover rounded-lg border"
          />
          <Button size="sm" intent="secondary" onClick={removePhoto}>
            Remove Photo
          </Button>
        </div>
      )}
    </form>
  );
}
