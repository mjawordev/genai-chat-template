import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  message: {
    role: 'assistant' | 'user';
    content: string;
    attachments?: string[];
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        'flex gap-4 p-4 rounded-lg w-full',
        isAssistant 
          ? 'bg-white dark:bg-gray-800/90 shadow-sm' 
          : 'bg-blue-50 dark:bg-gray-800/50'
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isAssistant 
          ? "bg-blue-500 text-white" 
          : "bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
      )}>
        {isAssistant ? (
          <Bot className="w-5 h-5" />
        ) : (
          <User className="w-5 h-5" />
        )}
      </div>
      <div className="flex-1">
        <div className="prose dark:prose-invert max-w-none dark:text-gray-200 whitespace-pre-wrap">
          {message.content}
        </div>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {message.attachments.map((url, index) => (
              <img
                key={index}
                src={url}
                alt="Attachment"
                className="max-w-[200px] rounded-lg border border-gray-200 dark:border-gray-700"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}