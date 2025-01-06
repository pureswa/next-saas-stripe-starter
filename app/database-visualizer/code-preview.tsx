import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CodePreviewSection() {
  const [activeTab, setActiveTab] = useState('code');

  return (
    <div className="h-full">
      <Tabs defaultValue="code" className="w-full">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          {/* Implement your code view here */}
          <pre className="p-4 bg-gray-100 rounded">
            {/* Your generated code will go here */}
          </pre>
        </TabsContent>
        <TabsContent value="preview">
          {/* Implement your preview here */}
          <div className="p-4 bg-white rounded border">
            {/* Your preview content will go here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
