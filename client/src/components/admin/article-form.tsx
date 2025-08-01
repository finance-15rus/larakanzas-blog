import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertArticleSchema } from "@shared/schema";
import type { InsertArticle, Article } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "./rich-text-editor";
import { Save, Send, Upload } from "lucide-react";

interface ArticleFormProps {
  article?: Article;
  onSubmit: (data: InsertArticle) => void;
  onSaveDraft?: (data: InsertArticle) => void;
  isLoading?: boolean;
}

const categories = ["Семья", "Путешествия", "Биография", "Журналистика"] as const;

export default function ArticleForm({ article, onSubmit, onSaveDraft, isLoading }: ArticleFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(article?.imageUrl || null);

  const form = useForm<InsertArticle>({
    resolver: zodResolver(insertArticleSchema),
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
      excerpt: article?.excerpt || "",
      category: (article?.category as "Семья" | "Путешествия" | "Биография" | "Журналистика") || "Журналистика",
      imageUrl: article?.imageUrl || "",
      readTime: article?.readTime || 5,
      slug: article?.slug || "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload this to a file storage service
      // For now, we'll create a placeholder URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        form.setValue("imageUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^а-яёa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    form.setValue("title", title);
    if (!article) {
      form.setValue("slug", generateSlug(title));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Заголовок статьи</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Введите заголовок статьи"
                        onChange={(e) => handleTitleChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Категория</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL статьи (slug)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="url-statii" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="readTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Время чтения (минуты)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание статьи</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      rows={3}
                      placeholder="Краткое описание статьи для превью"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Изображение статьи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL изображения</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="https://example.com/image.jpg"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setImagePreview(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center hover:border-accent transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-secondary">Нажмите для загрузки изображения или введите URL выше</p>
                  <p className="text-sm text-gray-400 mt-2">PNG, JPG до 10MB</p>
                </label>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <img 
                    src={imagePreview} 
                    alt="Превью изображения" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Содержание статьи</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Начните писать вашу статью..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between">
          {onSaveDraft && (
            <Button 
              type="button" 
              variant="outline"
              onClick={() => onSaveDraft(form.getValues())}
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              Сохранить как черновик
            </Button>
          )}
          
          <Button type="submit" disabled={isLoading} className="ml-auto">
            <Send className="h-4 w-4 mr-2" />
            {article ? "Обновить статью" : "Опубликовать статью"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
