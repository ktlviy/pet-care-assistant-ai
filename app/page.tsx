"use client";
import ChatContent from "./components/chat/ChatContent";

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 overflow-hidden">
      <main className="flex-1 min-h-0 flex flex-col items-center justify-center bg-gray-50 mt-16">
        <div className="w-full max-w-2xl flex flex-col flex-1 min-h-0 bg-white rounded-lg shadow-lg mb-4">
          <ChatContent />
        </div>
      </main>
    </div>
  );
}
