import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchPortfolioContent, PortfolioApiError } from '../services/portfolioApi';

describe('fetchPortfolioContent', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('throws when env vars are missing', async () => {
    vi.stubEnv('VITE_YARBA_API_URL', '');
    vi.stubEnv('VITE_YARBA_PORTFOLIO_TOKEN', '');

    await expect(fetchPortfolioContent()).rejects.toBeInstanceOf(PortfolioApiError);
  });

  it('returns parsed content for successful responses', async () => {
    vi.stubEnv('VITE_YARBA_API_URL', 'https://api.example.com');
    vi.stubEnv('VITE_YARBA_PORTFOLIO_TOKEN', 'pst_test_token');

    const payload = { personal: { full_name: 'Test User' } };
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => payload,
      })
    );

    await expect(fetchPortfolioContent()).resolves.toEqual(payload);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.example.com/api/v1/public/portfolio/content',
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-Portfolio-Site-Token': 'pst_test_token',
        }),
      })
    );
  });
});
