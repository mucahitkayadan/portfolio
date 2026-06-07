import type { YarbaPortfolioContent } from '../types/yarbaPortfolio';

const PORTFOLIO_SITE_TOKEN_HEADER = 'X-Portfolio-Site-Token';
const REQUEST_TIMEOUT_MS = 15000;

export class PortfolioApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'PortfolioApiError';
    this.status = status;
  }
}

export const fetchPortfolioContent = async (): Promise<YarbaPortfolioContent> => {
  const apiUrl = import.meta.env.VITE_YARBA_API_URL?.replace(/\/$/, '');
  const token = import.meta.env.VITE_YARBA_PORTFOLIO_TOKEN;

  if (!apiUrl || !token) {
    throw new PortfolioApiError(
      'Portfolio API is not configured. Set VITE_YARBA_API_URL and VITE_YARBA_PORTFOLIO_TOKEN.',
      0
    );
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${apiUrl}/api/v1/public/portfolio/content`, {
      method: 'GET',
      headers: {
        [PORTFOLIO_SITE_TOKEN_HEADER]: token,
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new PortfolioApiError(
        detail || `Failed to load portfolio content (${response.status})`,
        response.status
      );
    }

    return (await response.json()) as YarbaPortfolioContent;
  } catch (error) {
    if (error instanceof PortfolioApiError) {
      throw error;
    }
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new PortfolioApiError('Portfolio request timed out.', 408);
    }
    throw new PortfolioApiError(
      error instanceof Error ? error.message : 'Unable to load portfolio content.',
      0
    );
  } finally {
    window.clearTimeout(timeoutId);
  }
};
