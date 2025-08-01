import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import type { Article } from "@shared/schema";
import goldShieldImage from "@/assets/gold-shield-article.jpg";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
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

  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {article.imageUrl && (
        <div className="aspect-[16/9] overflow-hidden">
          <img 
            src={getImageSrc(article.imageUrl)} 
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-3">
          <Badge className={`category-badge ${getCategoryClass(article.category)}`}>
            {article.category}
          </Badge>
          <div className="flex items-center text-secondary text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {article.readTime} минут чтения
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-primary mb-3 leading-tight">
          {article.title}
        </h3>
        
        <p className="text-secondary mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <Link href={`/article/${article.slug}`}>
          <a className="text-accent hover:text-blue-600 font-medium inline-flex items-center">
            Читать дальше
            <ArrowRight className="h-4 w-4 ml-1" />
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}
