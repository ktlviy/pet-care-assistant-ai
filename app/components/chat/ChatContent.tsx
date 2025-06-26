import { useChatContext } from "@/app/context/ChatContex";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";

export default function ChatContent() {
  const {
    messages,
    handleSendText,
    handleSendPhoto,
    adviceMutation,
    photoMutation,
  } = useChatContext();

  return (
    <>
      <div
        className="flex-1 px-4 py-6 bg-gray-50 overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((msg, i) => (
          <ChatBubble key={i} {...msg} />
        ))}
        {adviceMutation.isPending && (
          <div className="flex justify-start mb-2">
            <div className="max-w-[70%] px-4 py-2 rounded-2xl shadow-md text-base whitespace-pre-line bg-gray-200 text-gray-900 rounded-bl-sm">
              Thinking...
            </div>
          </div>
        )}
        {adviceMutation.isError && (
          <div className="text-red-500 text-center mt-2">
            {(adviceMutation.error as Error)?.message || "Error occurred."}
          </div>
        )}
      </div>
      <ChatInput
        loading={adviceMutation.isPending || photoMutation.isPending}
        onSendText={handleSendText}
        onSendPhoto={handleSendPhoto}
      />
      {photoMutation.isError && (
        <div className="text-red-500 text-sm mt-1 px-4">
          {(photoMutation.error as Error)?.message || "Photo upload error."}
        </div>
      )}
    </>
  );
}
