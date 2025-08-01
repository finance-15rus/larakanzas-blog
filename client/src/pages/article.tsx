import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleContent from "@/components/article/article-content";
import { useArticle } from "@/hooks/use-articles";
import { Link } from "wouter";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function Article() {
  const { slug } = useParams();
  const { data: article, isLoading, error } = useArticle(slug || "");

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Skeleton className="h-10 w-32 mb-8" />
        <Card className="p-8 md:p-12">
          <Skeleton className="h-8 w-24 mb-4" />
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="w-full h-64 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">Статья не найдена</h1>
            </div>
            <p className="mt-4 text-sm text-gray-600 mb-6">
              Запрашиваемая статья не существует или была удалена.
            </p>
            <Link href="/">
              <a>
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Вернуться на главную
                </Button>
              </a>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/">
        <a>
          <Button variant="ghost" className="mb-8 p-0 text-accent hover:text-blue-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к статьям
          </Button>
        </a>
      </Link>
      
      <ArticleContent article={article} />
    </div>
  );
}
