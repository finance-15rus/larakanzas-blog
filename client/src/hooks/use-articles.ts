import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Article, InsertArticle } from "@shared/schema";

export function useArticles() {
  return useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });
}

export function useArticle(slug: string) {
  return useQuery<Article>({
    queryKey: ["/api/articles", slug],
    enabled: !!slug,
  });
}

export function useSearchArticles(query: string) {
  return useQuery<Article[]>({
    queryKey: ["/api/articles/search", query],
    enabled: !!query && query.length > 2,
  });
}

export function useCreateArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (article: InsertArticle) => {
      const response = await apiRequest("POST", "/api/articles", article);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
    },
  });
}

export function useUpdateArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, article }: { id: string; article: Partial<InsertArticle> }) => {
      const response = await apiRequest("PUT", `/api/articles/${id}`, article);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
    },
  });
}

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/articles/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
    },
  });
}
