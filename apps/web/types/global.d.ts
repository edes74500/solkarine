export {};

declare global {
  interface Window {
    gtag: (command: string, eventNameOrConfig: string, params?: Record<string, any>) => void;
  }
}
