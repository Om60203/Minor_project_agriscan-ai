import type { ExternalBlob } from "@caffeineai/object-storage";

export type { ExternalBlob };

export interface ScanInput {
  image: ExternalBlob;
  video?: ExternalBlob;
}

export interface ScanRecord {
  id: bigint;
  diseaseName: string;
  confidence: number;
  severity: string;
  description: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  organicSuggestions: string[];
  expertAdvice: string;
  imageUrl: ExternalBlob;
  videoUrl?: ExternalBlob;
  timestamp: bigint;
}

export interface DiseaseEntry {
  crop: string;
  name: string;
  imageUrl: ExternalBlob;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
}

export enum ChatRole {
  user = "user",
  assistant = "assistant",
}

export interface ChatMessage {
  content: string;
  role: ChatRole;
  timestamp: bigint;
}

export enum UserRole {
  admin = "admin",
  user = "user",
  guest = "guest",
}
