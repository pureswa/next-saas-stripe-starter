import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeGenerationSectionProps {
  generatedCode: string;
  isGenerating: boolean;
  previewData: any;
}

export default function CodeGenerationSection({ generatedCode, isGenerating, previewData }: CodeGenerationSectionProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  return (
    <div className="h-full flex flex-col">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'code' | 'preview')} className="flex-grow flex flex-col">
        <TabsList className="bg-gray-700">
          <TabsTrigger value="code" className="data-[state=active]:bg-gray-600">Code</TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-gray-600">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="flex-grow p-4 bg-gray-800">
      {isGenerating ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-white">Generating code...</p>
        </div>
      ) : (
            <SyntaxHighlighter 
          language="sql"
          style={vscDarkPlus}
              customStyle={{
                backgroundColor: 'transparent',
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
        <TabsContent value="preview" className="flex-grow p-4 bg-gray-800">
          <div className="bg-gray-700 text-white p-4 rounded-md h-full overflow-auto">
            {previewData ? (
              <pre>{JSON.stringify(previewData, null, 2)}</pre>
            ) : (
              <p>No preview data available</p>
            )}
    </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
    