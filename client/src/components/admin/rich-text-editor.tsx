import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, Link2, Image } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [selectedText, setSelectedText] = useState("");

  const insertText = (before: string, after: string = "") => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
      textarea.focus();
    }, 10);
  };

  const formatButtons = [
    {
      icon: Bold,
      label: "Жирный",
      action: () => insertText("**", "**"),
    },
    {
      icon: Italic,
      label: "Курсив",
      action: () => insertText("*", "*"),
    },
    {
      icon: List,
      label: "Список",
      action: () => insertText("\n- ", ""),
    },
    {
      icon: Link2,
      label: "Ссылка",
      action: () => insertText("[", "](url)"),
    },
    {
      icon: Image,
      label: "Изображение",
      action: () => insertText("![", "](image-url)"),
    },
  ];

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="border-b border-gray-300 p-3 bg-gray-50">
        <div className="flex space-x-2">
          {formatButtons.map((button) => (
            <Button
              key={button.label}
              type="button"
              variant="outline"
              size="sm"
              onClick={button.action}
              className="h-8 w-8 p-0"
              title={button.label}
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
      <Textarea
        name="content"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Начните писать вашу статью..."}
        className="min-h-[400px] border-0 resize-none focus:ring-0 rounded-none"
      />
    </div>
  );
}
