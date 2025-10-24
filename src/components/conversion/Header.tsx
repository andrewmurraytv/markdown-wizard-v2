import React from "react";
import { Bookmark } from "lucide-react";

const Header = () => {
  return (
    <header className="relative z-10 flex flex-col items-center p-2 bg-white border-b border-gray-200">
      {/* Central title */}
      <div className="text-center mb-4">
        <h1 className="font-caveat text-4xl mb-1 text-accent-primary">Markdown Converter Wizard</h1>
        <p className="subtitle">Convert Markdown to Rich-Text with ease.</p>
        <p className="subtitle -mt-3">Always 100% Free. No Signup.</p>
      </div>
      
      <div className="flex flex-col items-center">
        <button 
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'Markdown Converter Wizard',
                url: window.location.href
              });
            } else {
              const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
              const shortcut = isMac ? 'Cmd+D' : 'Ctrl+D';
              alert(`To bookmark this tool, press ${shortcut} or use your browser's bookmark button.`);
            }
          }}
          className="bookmark-text flex items-center gap-1 text-sm text-gray-600 mt-1 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <Bookmark className="h-4 w-4" /> Bookmark this tool
        </button>
        <div className="mt-4 flex items-center gap-6">
          {/* Decorative arrow and text */}
          <div className="relative hidden sm:block" style={{ width: '160px', height: '100px' }}>
            <div 
              className="absolute font-caveat text-lg"
              style={{ 
                color: '#3b82f6',
                top: '0px',
                left: '0px',
                whiteSpace: 'nowrap'
              }}
            >
              Try our other tools
            </div>
            <svg 
              viewBox="0 0 160 100" 
              className="absolute"
              style={{ overflow: 'visible', top: '25px' }}
            >
              <path
                d="M 10 20 Q 30 5, 50 15 Q 70 25, 80 45 Q 85 55, 75 65 Q 65 75, 85 75 Q 105 75, 125 70"
                stroke="#3b82f6"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 120 66 L 125 70 L 121 75"
                stroke="#3b82f6"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <div className="space-y-2 text-center">
            <a 
              href="#citation-cleaner" 
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Markdown Citation Cleaner
            </a>
            <a 
              href="#link-generator" 
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Markdown Link Generator
            </a>
            <a 
              href="#humanize-text" 
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Humanize Text Tool
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
