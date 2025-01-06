"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatSectionProps {
  messages: Array<{ role: string; content: string }>;
  addMessage: (message: { role: string; content: string }) => void;
}

export default function ChatSection({ messages, addMessage }: ChatSectionProps) {
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    addMessage({ role: "user", content: input });
      setInput("");
  };

  return (
    <div className="h-full flex flex-col border border-gray-700 rounded-lg overflow-hidden">
      <ScrollArea className="flex-grow mb-4 p-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 p-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
            {message.content}
            </span>
      </div>
        ))}
      </ScrollArea>
      <div className="flex p-4 border-t border-gray-700">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow mr-2 bg-gray-800 text-white"
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} className="bg-blue-600 text-white">Send</Button>
    </div>
    </div>
  );
}
