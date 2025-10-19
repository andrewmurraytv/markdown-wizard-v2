import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { checkRateLimit } from "@/utils/security";

export const useHumanizeText = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter some text to humanize.",
        variant: "destructive",
      });
      return;
    }

    if (!checkRateLimit("humanize-text")) {
      toast({
        title: "Rate Limit Exceeded",
        description: "Please wait a moment before trying again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("humanize-text", {
        body: { text: inputText },
      });

      if (error) {
        console.error("Error humanizing text:", error);
        
        if (error.message?.includes('429') || error.message?.includes('Rate limit')) {
          toast({
            title: "Rate Limit Exceeded",
            description: "AI service is busy. Please try again in a moment.",
            variant: "destructive",
          });
        } else if (error.message?.includes('402') || error.message?.includes('credits')) {
          toast({
            title: "Credits Exceeded",
            description: "Please add AI credits to continue using this feature.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Humanization Failed",
            description: "Unable to humanize text. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      if (data?.humanizedText) {
        setOutputText(data.humanizedText);
        toast({
          title: "Success",
          description: "Text has been humanized!",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handleCopy = async () => {
    if (!outputText) {
      toast({
        title: "Nothing to Copy",
        description: "Generate humanized text first.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Humanized text copied to clipboard.",
      });
    } catch (error) {
      console.error("Copy failed:", error);
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return {
    inputText,
    outputText,
    isLoading,
    handleInputChange,
    handleHumanize,
    handleClear,
    handleCopy,
  };
};