/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LAMBDA_EMAIL_URL: string;
  readonly VITE_API_GATEWAY_URL: string;
  readonly VITE_YARBA_API_URL: string;
  readonly VITE_YARBA_PORTFOLIO_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
