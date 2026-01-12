import { ThreeElements } from '@react-three/fiber';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface WebhookResponse {
  output: string; // Based on n8n "Respond to Webhook" node
}

export interface GearProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}