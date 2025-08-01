import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleCard from "@/components/article/article-card";
import { useArticles } from "@/hooks/use-articles";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import authorPhoto from "../assets/larisa-author-photo.jpeg";
import goldShieldImage from "@/assets/gold-shield-article.jpg";

export default function Home() {
  const { data: articles, isLoading, error } = useArticles();

  const featuredArticle = articles?.[0];
  const otherArticles = articles?.slice(1) || [];

  const getImageSrc = (imageUrl: string) => {
    if (imageUrl === "gold-shield-article.jpg") {
      return goldShieldImage;
    }
    return imageUrl;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки</h1>
            <p className="text-secondary">Не удалось загрузить статьи. Попробуйте обновить страницу.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <img 
              src={authorPhoto} 
              alt="Лариса Засеева" 
              className="w-80 h-80 rounded-full mx-auto mb-6 object-cover shadow-xl border-4 border-white"
            />
            <h2 className="text-4xl font-bold text-primary mb-4">Лариса Засеева</h2>
            <p className="text-xl text-secondary mb-6">Журналист • Автор • Греция</p>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Журналистские очерки о жизни, семье, путешествиях и размышления о важном из Греции и не только.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-primary mb-2">Семья</h3>
              <p className="text-secondary">Размышления о семейных ценностях и традициях</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-primary mb-2">Путешествия</h3>
              <p className="text-secondary">Истории о жизни в разных культурах</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-primary mb-2">Журналистика</h3>
              <p className="text-secondary">Профессиональный опыт и наблюдения</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {isLoading ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-64 mx-auto mb-8" />
            <Card className="overflow-hidden">
              <Skeleton className="w-full h-64" />
              <CardContent className="p-8">
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-6" />
                <Skeleton className="h-10 w-32" />
              </CardContent>
            </Card>
          </div>
        </section>
      ) : featuredArticle ? (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-primary mb-8 text-center">Рекомендуемая статья</h3>
            <Card className="overflow-hidden shadow-lg">
              {featuredArticle.imageUrl && (
                <img 
                  src={getImageSrc(featuredArticle.imageUrl)} 
                  alt={featuredArticle.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <span className={`category-badge ${featuredArticle.category.toLowerCase()}`}>
                    {featuredArticle.category}
                  </span>
                  <span className="text-secondary text-sm ml-4">{featuredArticle.readTime} минут чтения</span>
                </div>
                <h4 className="text-2xl font-bold text-primary mb-4">{featuredArticle.title}</h4>
                <p className="text-secondary mb-6">
                  {featuredArticle.excerpt}
                </p>
                <Link href={`/article/${featuredArticle.slug}`}>
                  <a>
                    <Button className="bg-accent text-white hover:bg-blue-600">
                      Читать полностью
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : null}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-primary mb-12 text-center">Все статьи</h3>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-24 mb-3" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {otherArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary text-lg">Статьи не найдены.</p>
              <Link href="/admin/create">
                <a>
                  <Button className="mt-4">Создать первую статью</Button>
                </a>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
