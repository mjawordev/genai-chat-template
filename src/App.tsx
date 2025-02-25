import React from 'react';
import { Paperclip, Send, Plus, MessageSquare, MessageCircle, Flag, User, Menu, X } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { ChatMessage } from './components/ChatMessage';
import { cn } from './lib/utils';

const SAMPLE_MESSAGES = [
  {
    role: 'user',
    content: 'Can you help me analyze this quarterly report?',
    attachments: ['https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300']
  },
  {
    role: 'assistant',
    content: "I've analyzed the quarterly report and here are the key findings:\n\n1. Revenue increased by 15% compared to last quarter\n2. Customer acquisition cost decreased by 8%\n3. New market expansion is on track\n\nWould you like me to dive deeper into any specific aspect?"
  },
  {
    role: 'user',
    content: 'Can you explain more about the market expansion plans?'
  },
  {
    role: 'assistant',
    content: 'The market expansion strategy focuses on three key regions:\n\n- Asia Pacific: Targeting Singapore and Japan as primary markets\n- Eastern Europe: Establishing presence in Poland and Czech Republic\n- Latin America: Beginning operations in Brazil\n\nThe timeline suggests full market penetration within the next 18 months, with initial operations starting in Q3 2024.'
  }
];

const SAMPLE_CHATS = [
  { id: 1, title: 'Quarterly Report Analysis', date: '2024-03-15' },
  { id: 2, title: 'Marketing Strategy Review', date: '2024-03-14' },
  { id: 3, title: 'Product Roadmap Discussion', date: '2024-03-13' },
];

function App() {
  const [messages, setMessages] = React.useState(SAMPLE_MESSAGES);
  const [input, setInput] = React.useState('');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const file = item.getAsFile();
        if (file) {
          // In a real app, you would upload this file to your server
          console.log('Image pasted:', file);
        }
      }
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const Sidebar = () => (
    <aside className={cn(
      "w-80 flex flex-col bg-white dark:bg-gray-900 shadow-[1px_0_5px_rgba(0,0,0,0.05)]",
      "fixed inset-y-0 left-0 z-40 lg:static",
      "transform transition-transform duration-300 ease-in-out",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="p-4 flex items-center justify-between gap-2">
          <button
            onClick={() => console.log('New chat')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
          >
            <X className="w-5 h-5 dark:text-gray-400" />
          </button>
        </div>
      </div>
      
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 py-2 space-y-0.5">
          {SAMPLE_CHATS.map((chat) => (
            <button
              key={chat.id}
              className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:text-gray-100"
            >
              <MessageSquare className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <div className="flex-1 truncate">
                <div className="font-medium text-sm">{chat.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{chat.date}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-3">
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0 dark:text-gray-100">
            <div className="font-medium text-sm truncate">Sarah Johnson</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Product Manager</div>
          </div>
          <button
            onClick={() => console.log('Feedback')}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Send Feedback"
          >
            <Flag className="w-4 h-4 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-950">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen shadow-[-1px_0_5px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
              >
                <Menu className="w-5 h-5 dark:text-gray-400" />
              </button>
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <h1 className="text-xl font-semibold dark:text-gray-100">Company Chat Assistant</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="max-w-4xl mx-auto w-full space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="sticky bottom-0 z-20 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-stretch gap-4 max-w-4xl mx-auto">
            <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center p-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaInput}
                  onPaste={handlePaste}
                  placeholder="Type your message..."
                  className="flex-1 p-2 bg-transparent outline-none resize-none dark:text-gray-100 dark:placeholder-gray-400 min-h-[44px] max-h-[200px]"
                  style={{ height: 'auto' }}
                  rows={1}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg dark:text-gray-300 flex-shrink-0"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // In a real app, you would upload this file to your server
                    console.log('File selected:', file);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              className={cn(
                "w-[60px] h-[60px] flex items-center justify-center rounded-lg flex-shrink-0",
                input.trim()
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              )}
              disabled={!input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;