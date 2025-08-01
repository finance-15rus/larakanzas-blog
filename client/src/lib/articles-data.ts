export const ARTICLE_CATEGORIES = [
  "Семья",
  "Путешествия", 
  "Биография",
  "Журналистика"
] as const;

export type ArticleCategory = typeof ARTICLE_CATEGORIES[number];

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  "Семья": "category-семья",
  "Путешествия": "category-путешествия", 
  "Биография": "category-биография",
  "Журналистика": "category-журналистика"
};

export const CATEGORY_DESCRIPTIONS: Record<ArticleCategory, string> = {
  "Семья": "Статьи о семейных ценностях, воспитании и межпоколенческих отношениях",
  "Путешествия": "Рассказы о жизни в разных странах, культурных различиях и эмиграции",
  "Биография": "Автобиографические очерки и размышления о жизненном пути",
  "Журналистика": "Профессиональные заметки и размышления о журналистской деятельности"
};

export const DEFAULT_ARTICLE_IMAGE = "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400";

export const READING_TIME_WORDS_PER_MINUTE = 200;

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / READING_TIME_WORDS_PER_MINUTE));
}

export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^а-яёa-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function formatPublishDate(date: Date | string | null): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long", 
    day: "numeric",
  });
}

export function getCategoryDisplayName(category: string): string {
  return ARTICLE_CATEGORIES.find(cat => cat.toLowerCase() === category.toLowerCase()) || category;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export const SOCIAL_LINKS = {
  email: "larakanzas@yahoo.com",
  facebook: "#",
  twitter: "#", 
  instagram: "#"
};

export const SITE_CONFIG = {
  title: "Лариса Засеева",
  subtitle: "Журналист",
  description: "Журналистские очерки о жизни, семье, путешествиях и размышления о важном из Греции и не только.",
  author: "Лариса Засеева",
  location: "Греция",
  founded: "2024"
};

export const META_DESCRIPTIONS = {
  home: "Личный блог журналиста Ларисы Засеевой. Статьи о семье, эмиграции, жизни в Греции и размышления о важном.",
  about: "О журналисте Ларисе Засеевой - биография, творческий путь, опыт жизни в Греции и журналистской деятельности.",
  admin: "Административная панель для управления статьями блога Ларисы Засеевой.",
};
