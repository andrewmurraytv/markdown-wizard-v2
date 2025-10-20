import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Trash2, Sparkles } from 'lucide-react';
import { useCitationCleaner } from '@/hooks/useCitationCleaner';

const CitationCleaner = () => {
  const {
    inputText,
    outputText,
    setInputText,
    handleClean,
    handleCopy,
    handleClear
  } = useCitationCleaner();

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12" id="citation-cleaner">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 text-foreground">Remove Citations from Markdown</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Clean up your markdown by removing citation markers like [1], [2,3] and citation lists at the end of your text.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="flex flex-col bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="bg-muted px-4 py-3 border-b">
            <h3 className="font-semibold text-sm">Markdown with Citations</h3>
          </div>
          <div className="flex-1 p-4">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your markdown text with citations here..."
              className="min-h-[300px] resize-none font-mono text-sm"
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="bg-muted px-4 py-3 border-b flex items-center justify-between">
            <h3 className="font-semibold text-sm">Cleaned Markdown</h3>
            {outputText && (
              <Button
                onClick={handleCopy}
                variant="ghost"
                size="sm"
                className="h-8"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            )}
          </div>
          <div className="flex-1 p-4 bg-muted/20">
            <div className="min-h-[300px] font-mono text-sm whitespace-pre-wrap break-words">
              {outputText || (
                <span className="text-muted-foreground italic">
                  Cleaned markdown will appear here...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 mt-6">
        <Button
          onClick={handleClean}
          disabled={!inputText}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Clean Citations
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          disabled={!inputText && !outputText}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>
    </section>
  );
};

export default CitationCleaner;
