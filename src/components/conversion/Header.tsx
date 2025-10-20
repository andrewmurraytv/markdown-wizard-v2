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
        <div className="mt-4 space-y-2 text-center">
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
    </header>
  );
};

export default Header;
