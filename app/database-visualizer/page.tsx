"use client";
import { useState } from "react";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import ChatSection from "@/components/database-visualizer/chat-section";
import CodeGenerationSection from "@/components/database-visualizer/code-generation-section";

export default function DatabaseVisualizerPage() {
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [previewData, setPreviewData] = useState<any>(null);

  const addMessage = async (message: { role: string; content: string }) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
    if (message.role === "user") {
      setIsGenerating(true);
      setGeneratedCode('');
      setPreviewData(null);
      try {
        const response = await fetch('/api/groq-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...chatMessages, message],
            prompt: "Generate a valid PostgreSQL SELECT query based on the following request. Do not include any explanations, only return the SQL query: " + message.content
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate code');
        }

        const generatedSql = data.content.trim();
        setGeneratedCode(generatedSql);
        
        await generatePreview(generatedSql);
      } catch (error) {
        console.error('Error generating code:', error);
        setGeneratedCode('Error: ' + (error instanceof Error ? error.message : 'Failed to generate code. Please try again.'));
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const generatePreview = async (sql: string) => {
    try {
      const response = await fetch('/api/execute-sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to execute SQL');
    }

      setPreviewData(data);
    } catch (error) {
      console.error('Error generating preview:', error);
      setPreviewData({ error: 'Failed to generate preview: ' + (error instanceof Error ? error.message : String(error)) });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <MaxWidthWrapper className="flex flex-col lg:flex-row min-h-screen p-4 gap-4">
        <div className="w-full lg:w-1/2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-xl font-bold p-4 bg-gray-700">Chat</h2>
          <ChatSection messages={chatMessages} addMessage={addMessage} />
        </div>
        <div className="w-full lg:w-1/2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-xl font-bold p-4 bg-gray-700">Code Preview</h2>
          <CodeGenerationSection 
            generatedCode={generatedCode} 
            isGenerating={isGenerating} 
            previewData={previewData}
          />
    </div>
      </MaxWidthWrapper>
    </div>
  );
}
