// src/globals.d.ts
export {};

declare global {
  interface Window {
    google: typeof google;
  }
}
