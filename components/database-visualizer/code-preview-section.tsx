"use client";

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';

SyntaxHighlighter.registerLanguage('sql', sql);

interface CodePreviewSectionProps {
  codePreview: string;
}

export default function CodePreviewSection({ codePreview }: CodePreviewSectionProps) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-white">Generated Database Code</h2>
      <SyntaxHighlighter 
        language="sql"
            style={vscDarkPlus}
        className="rounded-md flex-grow overflow-auto"
          >
        {codePreview || '-- Generated database code will appear here'}
          </SyntaxHighlighter>
          </div>
  );
}
