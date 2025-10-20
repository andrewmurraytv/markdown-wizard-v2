import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMarkdownLinkGenerator, LinkType } from "@/hooks/useMarkdownLinkGenerator";
import { Link, Image, Youtube } from "lucide-react";

const MarkdownLinkGenerator = () => {
  const {
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
  } = useMarkdownLinkGenerator();

  return (
    <section className="markdown-link-generator py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Markdown Link Generator</h2>
        <p className="text-muted-foreground text-center mb-8">
          Create hyperlinks, images, or YouTube embeds in markdown format
        </p>

        <div className="bg-card rounded-lg p-6 shadow-md border">
          <div className="space-y-6">
            {/* Link Type Selection */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Link Type</Label>
              <RadioGroup 
                value={linkType} 
                onValueChange={(value) => setLinkType(value as LinkType)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hyperlink" id="hyperlink" />
                  <Label htmlFor="hyperlink" className="flex items-center gap-2 cursor-pointer">
                    <Link className="w-4 h-4" />
                    Hyperlink
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="image" id="image" />
                  <Label htmlFor="image" className="flex items-center gap-2 cursor-pointer">
                    <Image className="w-4 h-4" />
                    Image
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="youtube" id="youtube" />
                  <Label htmlFor="youtube" className="flex items-center gap-2 cursor-pointer">
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* URL Input */}
            <div>
              <Label htmlFor="url" className="text-base font-semibold mb-2 block">
                {linkType === "youtube" ? "YouTube URL" : "URL"}
              </Label>
              <Input
                id="url"
                type="url"
                placeholder={
                  linkType === "youtube" 
                    ? "https://www.youtube.com/watch?v=OZfii9D7o_Q" 
                    : linkType === "image"
                    ? "https://giphy.com/gifs/rick-astley-Ju7l5y9osyymQ"
                    : "https://www.digitalabc.net/affiliate?ref=markdown"
                }
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {/* Text Input (not needed for YouTube) */}
            {linkType !== "youtube" && (
              <div>
                <Label htmlFor="text" className="text-base font-semibold mb-2 block">
                  {linkType === "image" ? "Alt Text (optional)" : "Link Text"}
                </Label>
                <Input
                  id="text"
                  type="text"
                  placeholder={linkType === "image" ? "Image description" : "Click here"}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleGenerate} className="flex-1">
                Generate Markdown
              </Button>
              <Button onClick={handleClear} variant="outline">
                Clear
              </Button>
            </div>

            {/* Output */}
            {output && (
              <div className="space-y-2">
                <Label className="text-base font-semibold">Generated Markdown</Label>
                <div className="relative">
                  <div className="bg-muted p-4 rounded-md font-mono text-sm break-all">
                    {output}
                  </div>
                  <Button
                    onClick={handleCopy}
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarkdownLinkGenerator;
