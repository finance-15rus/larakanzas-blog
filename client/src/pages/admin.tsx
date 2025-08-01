import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticles, useDeleteArticle } from "@/hooks/use-articles";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MessageSquare, 
  Users, 
  BarChart3,
  Settings,
  Palette,
  User,
  Mail,
  Home
} from "lucide-react";

export default function Admin() {
  const { data: articles, isLoading } = useArticles();
  const deleteArticle = useDeleteArticle();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Вы уверены, что хотите удалить статью "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteArticle.mutateAsync(id);
      toast({
        title: "Статья удалена",
        description: "Статья была успешно удалена.",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить статью. Попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryClass = (category: string) => {
    const normalized = category.toLowerCase();
    return `category-${normalized}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Панель администратора</h1>
        <Link href="/">
          <a>
            <Button variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Вернуться на сайт
            </Button>
          </a>
        </Link>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-accent mr-4" />
              <div>
                <p className="text-2xl font-bold text-primary">
                  {isLoading ? "..." : articles?.length || 0}
                </p>
                <p className="text-secondary">Статьи</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-primary">1,247</p>
                <p className="text-secondary">Просмотры</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-primary">89</p>
                <p className="text-secondary">Комментарии</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500 mr-4" />
              <div>
                <p className="text-2xl font-bold text-primary">342</p>
                <p className="text-secondary">Подписчики</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Article Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Edit className="h-5 w-5 mr-2" />
              Управление статьями
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/create">
              <a>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать новую статью
                </Button>
              </a>
            </Link>
            
            <div className="border rounded-md p-4 max-h-80 overflow-y-auto">
              <h4 className="font-medium text-primary mb-4">Все статьи:</h4>
              
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  ))}
                </div>
              ) : articles && articles.length > 0 ? (
                <div className="space-y-3">
                  {articles.map((article) => (
                    <div key={article.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary truncate">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`category-badge ${getCategoryClass(article.category)} text-xs`}>
                            {article.category}
                          </Badge>
                          <span className="text-xs text-secondary">
                            {article.readTime} мин
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Link href={`/article/${article.slug}`}>
                          <a>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </a>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteArticle(article.id, article.title)}
                          disabled={deletingId === article.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-secondary text-sm">Статьи не найдены</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Site Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Настройки сайта
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Palette className="h-4 w-4 mr-2" />
              Настройки дизайна
            </Button>
            
            <Link href="/about">
              <a>
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Профиль автора
                </Button>
              </a>
            </Link>
            
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              Аналитика
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Управление подпиской
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
