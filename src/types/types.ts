export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface EvaluationMetrics {
  relevance: number;
  accuracy: number;
  helpfulness: number;
  clarity: number;
  safety: number;
  overall: number;
  comments: string;
}

export interface Conversation {
  id: number;
  title: string;
  messages: Message[];
  timestamp: number;
  isLabeled: boolean;
  evaluation?: EvaluationMetrics;
}