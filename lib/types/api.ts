export interface AnalysisResponse {
  analysis: string;
  blog_content: string;
  images?: Record<string, string> | null;
}

export interface ContentRequest {
  url?: string | null;
  text?: string | null;
} 