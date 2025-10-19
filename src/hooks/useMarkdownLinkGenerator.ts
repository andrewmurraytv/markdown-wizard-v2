import { useState } from "react";
import { toast } from "sonner";
import { checkRateLimit } from "../utils/security";

export type LinkType = "hyperlink" | "image" | "youtube";

export const useMarkdownLinkGenerator = () => {
  const [linkType, setLinkType] = useState<LinkType>("hyperlink");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    if (!checkRateLimit()) {
      toast.error("Too many requests. Please wait a moment.");
      return;
    }

    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    let result = "";
    
    switch (linkType) {
      case "hyperlink":
        if (!text.trim()) {
          toast.error("Please enter text for the hyperlink");
          return;
        }
        result = `[${text}](${url})`;
        break;
      
      case "image":
        const altText = text.trim() || "image";
        result = `![${altText}](${url})`;
        break;
      
      case "youtube":
        result = `[![Watch on YouTube](https://img.youtube.com/vi/${extractYouTubeId(url)}/0.jpg)](${url})`;
        break;
    }

    setOutput(result);
  };

  const extractYouTubeId = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return "VIDEO_ID";
  };

  const handleCopy = () => {
    if (!output) return;
    
    navigator.clipboard.writeText(output)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy"));
  };

  const handleClear = () => {
    setUrl("");
    setText("");
    setOutput("");
  };

  return {
    linkType,
    setLinkType,
    url,
    setUrl,
    text,
    setText,
    output,
    handleGenerate,
    handleCopy,
    handleClear
  };
};
