import { Metadata } from "next"
import { ChatBot } from "@/components/chat/chat-bot"

export const metadata: Metadata = {
  title: "Chat",
  description: "Chat with our AI assistant",
}

export default function ChatPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Chat with AI Assistant</h1>
      <ChatBot />
    </div>
  )
}
