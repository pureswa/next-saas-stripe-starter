import { ChatBot } from "@/components/chat/chat-bot";

export default function ChatPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Chat with Us</h1>
      <ChatBot />
    </div>
  );
}
