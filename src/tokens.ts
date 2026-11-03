// GENERADO por scripts/build-tokens.mjs a partir de tokens/tokens.json. No editar a mano.
export const colors = {
  "surface-100": {
    "light": "#F6F6FB",
    "dark": "#0A0B22"
  },
  "surface-200": {
    "light": "#FFFFFF",
    "dark": "#13153A"
  },
  "surface-300": {
    "light": "#E7E8FF",
    "dark": "#1C1F57"
  },
  "ink": {
    "light": "#0E0F2E",
    "dark": "#F6F6FB"
  },
  "ink-muted": {
    "light": "#474A6E",
    "dark": "#B4B7DB"
  },
  "line": {
    "light": "#DCDDEE",
    "dark": "#2C2E5A"
  },
  "line-strong": {
    "light": "#7377A6",
    "dark": "#8A8EC4"
  },
  "brand": {
    "light": "#3232D8",
    "dark": "#9EA2FF"
  },
  "brand-strong": {
    "light": "#2A2AC0",
    "dark": "#B5B8FF"
  },
  "on-brand": {
    "light": "#FFFFFF",
    "dark": "#0E0F2E"
  },
  "deep": {
    "light": "#0E0F2E",
    "dark": "#232888"
  },
  "on-deep": {
    "light": "#F6F6FB",
    "dark": "#F6F6FB"
  },
  "acento": {
    "light": "#FFD23F",
    "dark": "#FFD23F"
  },
  "on-acento": {
    "light": "#0E0F2E",
    "dark": "#0E0F2E"
  },
  "patron-a": {
    "light": "#E7E8FF",
    "dark": "#1B1D50"
  },
  "patron-b": {
    "light": "#DCDDF8",
    "dark": "#25286F"
  },
  "patron-deep-a": {
    "light": "#1A1C4C",
    "dark": "#2D33A6"
  },
  "patron-deep-b": {
    "light": "#23266A",
    "dark": "#363CBA"
  },
  "patron-brand-a": {
    "light": "#3D3DE4",
    "dark": "#AEB1FF"
  },
  "patron-brand-b": {
    "light": "#2A2AC0",
    "dark": "#8F93F5"
  },
  "ok": {
    "light": "#0A4F43",
    "dark": "#7FE0C8"
  },
  "ok-bg": {
    "light": "#D8EFE9",
    "dark": "#0B3A32"
  },
  "warn": {
    "light": "#5E3F00",
    "dark": "#FFD27A"
  },
  "warn-bg": {
    "light": "#FCEBC8",
    "dark": "#3D2B00"
  },
  "danger": {
    "light": "#861F0D",
    "dark": "#FFA08A"
  },
  "danger-bg": {
    "light": "#FBE0D8",
    "dark": "#4A160B"
  },
  "focus": {
    "light": "#0E0F2E",
    "dark": "#F6F6FB"
  }
} as const;

export const spacing = {
  "space-1": "4px",
  "space-2": "8px",
  "space-3": "12px",
  "space-4": "16px",
  "space-5": "24px",
  "space-6": "32px",
  "space-7": "48px",
  "space-8": "64px",
  "space-9": "96px"
} as const;

export const radius = {
  "radius-xs": "4px",
  "radius-sm": "8px",
  "radius-md": "12px",
  "radius-lg": "20px",
  "radius-xl": "28px",
  "radius-pill": "999px"
} as const;

export const fonts = {
  "display": "\"Space Grotesk\", system-ui, sans-serif",
  "body": "\"Instrument Sans\", system-ui, sans-serif",
  "mono": "\"JetBrains Mono\", ui-monospace, monospace"
} as const;

export type ColorToken = keyof typeof colors;
export type Theme = 'light' | 'dark';
