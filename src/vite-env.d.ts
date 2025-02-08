/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GENKWIZ_BASE_API: string;
  readonly VITE_GENKWIZ_SESSION_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
