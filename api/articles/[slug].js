import { storage } from "../../server/storage.js";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const { slug } = req.query;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ message: "Статья не найдена" });
      }
      
      res.status(200).json(article);
    } catch (error) {
      console.error('Error fetching article:', error);
      res.status(500).json({ message: "Ошибка при получении статьи" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
