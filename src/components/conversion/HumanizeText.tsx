import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useHumanizeText } from "@/hooks/useHumanizeText";
import { Loader2 } from "lucide-react";

export const HumanizeText = () => {
  const {
    inputText,
    outputText,
    isLoading,
    handleInputChange,
    handleHumanize,
    handleClear,
    handleCopy,
  } = useHumanizeText();

  return (
    <div className="w-full max-w-6xl mx-auto mb-8" id="humanize-text">
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Humanize Text</h2>
        <p className="text-muted-foreground mb-6">
          Transform formal academic writing into conversational, engaging prose using AI-powered natural language processing.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Input Text</label>
            <Textarea
              placeholder="Paste your formal text here..."
              value={inputText}
              onChange={(e) => handleInputChange(e.target.value)}
              className="min-h-[300px] font-sans"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Humanized Output</label>
            <Textarea
              placeholder="Humanized text will appear here..."
              value={outputText}
              readOnly
              className="min-h-[300px] font-sans bg-muted"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          <Button 
            onClick={handleHumanize} 
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Humanizing..." : "Humanize Text"}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCopy}
            disabled={!outputText}
          >
            Copy Output
          </Button>
          <Button 
            variant="outline" 
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
};