export interface Dream {
  id: string;
  title: string;
  description: string;
  price: number;
  author: string;
  tags: string[];
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Forbidden';
  intensity: number; // 0-100
  imageUrl?: string;
}

export interface DreamAnalysis {
  rarity: string;
  sentiment: string;
  estimatedValue: number;
  visualKeywords: string[];
  analysisText: string;
}