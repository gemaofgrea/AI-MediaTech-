export type ThemeMode = "light" | "dark" | "system";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
}
