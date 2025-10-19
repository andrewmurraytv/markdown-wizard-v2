import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { removeCitationMarkers } from '@/utils/conversion';
import { checkRateLimit, validateConversionInput } from '@/utils/security';

export function useCitationCleaner() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleClean = () => {
    // Rate limiting check
    if (!checkRateLimit('citation-cleaner')) {
      toast({
        title: "Rate limit exceeded",
        description: "Please wait a moment before cleaning again.",
        variant: "destructive"
      });
      return;
    }

    // Validate input
    const validation = validateConversionInput({
      text: inputText,
      direction: 'markdown-to-rich',
      removeCitations: true
    });

    if (!validation.success) {
      toast({
        title: "Invalid input",
        description: validation.error,
        variant: "destructive"
      });
      return;
    }

    try {
      const cleaned = removeCitationMarkers(inputText);
      setOutputText(cleaned);
      
      toast({
        title: "Citations removed",
        description: "Your markdown has been cleaned successfully."
      });
    } catch (error) {
      console.error('Error cleaning citations:', error);
      toast({
        title: "Error",
        description: "Failed to clean citations. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCopy = async () => {
    if (!outputText) {
      toast({
        title: "Nothing to copy",
        description: "Please clean your markdown first.",
        variant: "destructive"
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Cleaned markdown copied to clipboard."
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try copying manually.",
        variant: "destructive"
      });
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  return {
    inputText,
    outputText,
    setInputText,
    handleClean,
    handleCopy,
    handleClear
  };
}
