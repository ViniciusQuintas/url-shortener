export interface Url {
  id: string;
  code: string;
  originalUrl: string;
  userId: string;
  expiresAt?: string;
  createdAt: string;
}

export interface Analytic {
  date: string;
  clicks: number;
}
