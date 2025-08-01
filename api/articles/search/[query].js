import { storage } from "../../../server/storage.js";

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
      const { query } = req.query;
      const searchQuery = decodeURIComponent(query);
      const articles = await storage.searchArticles(searchQuery);
      
      res.status(200).json(articles);
    } catch (error) {
      console.error('Error searching articles:', error);
      res.status(500).json({ message: "Ошибка при поиске статей" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
