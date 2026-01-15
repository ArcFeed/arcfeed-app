/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL?: string;
    readonly VITE_API_KEY?: string;
    readonly VITE_PRIMARY_WALLET_ID?: string;
    // add other VITE_ env vars used in the app as needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {}; // ensure this file is a module and the declarations are global
