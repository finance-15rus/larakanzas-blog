import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import type { Article } from "@shared/schema";
import goldShieldImage from "@/assets/gold-shield-article.jpg";

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const getCategoryClass = (category: string) => {
    const normalized = category.toLowerCase();
    return `category-${normalized}`;
  };

  const getImageSrc = (imageUrl: string) => {
    if (imageUrl === "gold-shield-article.jpg") {
      return goldShieldImage;
    }
    return imageUrl;
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') return null;
      
      // Handle headers
      if (paragraph.match(/^[А-ЯЁ][а-яё\s]+$/)) {
        return (
          <h2 key={index} className="text-2xl font-bold text-primary mt-8 mb-4">
            {paragraph.trim()}
          </h2>
        );
      }
      
      return (
        <p key={index} className="text-gray-800 leading-relaxed mb-4">
          {paragraph.trim()}
        </p>
      );
    });
  };

  return (
    <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Badge className={`category-badge ${getCategoryClass(article.category)}`}>
            {article.category}
          </Badge>
          <div className="flex items-center text-secondary text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {article.readTime} минут чтения
          </div>
          {article.published && (
            <div className="flex items-center text-secondary text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(article.published)}
            </div>
          )}
        </div>
        
        <h1 className="text-4xl font-bold text-primary mb-4 font-serif">
          {article.title}
        </h1>
        
        {article.imageUrl && (
          <img 
            src={getImageSrc(article.imageUrl)} 
            alt={article.title}
            className="w-full h-64 object-cover rounded-xl shadow-lg mb-6"
          />
        )}
        
        {article.excerpt && (
          <p className="text-xl text-secondary mb-6 font-sans italic">
            {article.excerpt}
          </p>
        )}
      </header>

      <div className="article-content">
        {formatContent(article.content)}
      </div>
    </article>
  );
}
