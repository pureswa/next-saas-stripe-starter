"use client";

import { useState } from "react";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CodePreviewSectionProps {
  generatedCode: string;
  isGenerating: boolean;
  previewData: any;
}

function CodePreviewSection({ generatedCode, isGenerating, previewData }: CodePreviewSectionProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'code' | 'preview')} className="flex-grow flex flex-col">
        <TabsList className="bg-gray-700">
          <TabsTrigger value="code" className="data-[state=active]:bg-gray-600">Code</TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-gray-600">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="flex-grow p-4 bg-black">
          {isGenerating ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-white">Generating code...</p>
            </div>
          ) : (
            <SyntaxHighlighter 
              language="sql"
              style={vscDarkPlus}
              customStyle={{
                backgroundColor: 'black',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                lineHeight: '1.5',
              }}
              className="rounded-md flex-grow overflow-auto"
            >
              {generatedCode || '-- Generated database code will appear here'}
            </SyntaxHighlighter>
          )}
        </TabsContent>
        <TabsContent value="preview" className="flex-grow p-4 bg-gray-900">
          <div className="bg-gray-800 text-white p-4 rounded-md h-full overflow-auto">
            {previewData ? (
              <pre className="whitespace-pre-wrap">{JSON.stringify(previewData, null, 2)}</pre>
            ) : (
              <p>No preview data available</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
  
export default function DatabaseVisualizerPage() {
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
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

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      addMessage({ role: "user", content: inputMessage.trim() });
      setInputMessage("");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <MaxWidthWrapper className="flex min-h-screen p-4">
        {/* Chat Section */}
        <div className="w-1/2 pr-2 flex flex-col">
          <div className="flex-grow bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-4 p-4">
            <div className="h-full overflow-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                    {msg.content}
                  </span>
        </div>
              ))}
          </div>
        </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow mr-2"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
    </div>
          </div>
        </div>

        {/* Code Preview Section */}
        <div className="w-1/2 pl-2">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
            <CodePreviewSection 
              generatedCode={generatedCode} 
              isGenerating={isGenerating} 
              previewData={previewData}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
