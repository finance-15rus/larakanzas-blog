import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ArticleForm from "@/components/admin/article-form";
import { useCreateArticle } from "@/hooks/use-articles";
import { useToast } from "@/hooks/use-toast";
import type { InsertArticle } from "@shared/schema";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function CreateArticle() {
  const createArticle = useCreateArticle();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (data: InsertArticle) => {
    try {
      const article = await createArticle.mutateAsync(data);
      toast({
        title: "Статья создана",
        description: "Статья была успешно опубликована.",
      });
      setLocation(`/article/${article.slug}`);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать статью. Проверьте данные и попробуйте снова.",
        variant: "destructive",
      });
    }
  };

  const handleSaveDraft = (data: InsertArticle) => {
    // In a real application, you would save this as a draft
    localStorage.setItem("article-draft", JSON.stringify(data));
    toast({
      title: "Черновик сохранен",
      description: "Ваша статья сохранена как черновик.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Создать новую статью</h1>
        <Link href="/admin">
          <a>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к админ-панели
            </Button>
          </a>
        </Link>
      </div>

      <Card>
        <CardContent className="p-8">
          <ArticleForm 
            onSubmit={handleSubmit}
            onSaveDraft={handleSaveDraft}
            isLoading={createArticle.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
