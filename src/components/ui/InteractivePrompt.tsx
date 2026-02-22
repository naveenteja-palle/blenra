'use client';

import { useState } from 'react';
import Link from 'next/link'; // <-- NEW: Imported Next.js Link
import CopyButton from '@/components/ui/CopyButton';
import { PromptItem } from '@/types/prompt';

export default function InteractivePrompt({ promptData }: { promptData: PromptItem }) {
  // State to hold the user's custom input for each variable
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  // Handle when a user types into an input field
  const handleInputChange = (variableName: string, value: string) => {
    setInputValues((prev) => ({
      ...prev,
      [variableName]: value,
    }));
  };

  // Compute the live prompt text based on user input
  let livePromptText = promptData.basePrompt;
  promptData.variables.forEach((variable) => {
    const userValue = inputValues[variable];
    if (userValue) {
      // Escape the brackets in the variable name for the RegEx, then replace all instances globally
      const escapedVar = variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escapedVar, 'g');
      livePromptText = livePromptText.replace(regex, userValue);
    }
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      {/* LEFT COLUMN: Context & Interactive Variables */}
      <div className="lg:col-span-4 flex flex-col gap-8">
        <div>
          {/* THE NEW FIX: Flex container holding both the AI Badge and the Clickable Tag */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="inline-flex items-center rounded-full bg-[var(--card)] border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
              Optimized for: {promptData.targetAI}
            </div>
            
            {/* Clickable Tag linked to your new archive page */}
            {promptData.tag && (
              <Link 
                href={`/tag/${promptData.tag.replace('#', '').toLowerCase()}`}
                className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400 hover:bg-blue-500/20 transition-colors"
              >
                {promptData.tag}
              </Link>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
            {promptData.title}
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Customize the variables below to instantly engineer your prompt.
          </p>
        </div>

        {/* The Interactive Input Box */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-5">Required Variables</h3>
          
          <div className="space-y-4">
            {promptData.variables.length > 0 ? (
              promptData.variables.map((variable, i) => {
                // Remove the brackets for the input label (e.g., "[BUDGET]" -> "BUDGET")
                const cleanLabel = variable.replace(/[\[\]]/g, '');
                
                return (
                  <div key={i} className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-300 flex items-center gap-1.5">
                      <span className="text-[var(--primary)]">✦</span> {cleanLabel}
                    </label>
                    <input
                      type="text"
                      placeholder={`e.g. your ${cleanLabel.toLowerCase()}`}
                      value={inputValues[variable] || ''}
                      onChange={(e) => handleInputChange(variable, e.target.value)}
                      className="w-full bg-[#0a0d12] border border-[var(--border)] text-sm text-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all placeholder:text-gray-600"
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 italic">No variables required for this prompt.</p>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: The Live Code/Prompt Engine */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="relative bg-[#0d1117] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl">
          {/* Window Mac-style header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[var(--card)] border-b border-[var(--border)]">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-2 text-xs font-medium text-gray-400">{promptData.slug}.txt</span>
          </div>
          
          {/* The Live Updating Text */}
          <div className="p-6 sm:p-8 overflow-x-auto text-sm sm:text-base text-gray-300 font-mono leading-relaxed whitespace-pre-wrap selection:bg-[var(--primary)] selection:text-white">
            {livePromptText}
          </div>
          
          {/* We pass the LIVE text to the copy button, not the static base text! */}
          <CopyButton textToCopy={livePromptText} />
        </div>

        {/* Launch in AI Quick Links */}
        <div className="flex flex-wrap items-center gap-3 px-1 -mt-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Launch In:</span>
          
          <a 
            href="https://chatgpt.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--card)] text-xs font-medium text-gray-300 hover:text-white hover:border-gray-500 transition-all"
          >
            ChatGPT
          </a>
          
          <a 
            href="https://claude.ai/new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--card)] text-xs font-medium text-gray-300 hover:text-white hover:border-gray-500 transition-all"
          >
            Claude
          </a>
          
          <a 
            href="https://gemini.google.com/app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--card)] text-xs font-medium text-gray-300 hover:text-white hover:border-gray-500 transition-all"
          >
            Gemini
          </a>
        </div>

        {/* Example Output Box */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
          <h3 className="text-sm font-bold tracking-wider text-[var(--primary)] mb-2">Example Output</h3>
          <p className="text-sm text-gray-400 italic border-l-2 border-[var(--border)] pl-4">
            "{promptData.exampleOutput}"
          </p>
        </div>
      </div>

    </div>
  );
}