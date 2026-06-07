import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { fetchPortfolioContent } from '../services/portfolioApi';
import type { PortfolioData } from '../types/portfolio';
import { mapYarbaPortfolio } from '../utils/mapYarbaPortfolio';
import { mockYarbaPortfolioContent } from '../fixtures/portfolioContent';

interface PortfolioContextValue {
  data: PortfolioData | null;
  loading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

const useMockInTests = import.meta.env.MODE === 'test';

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData | null>(() =>
    useMockInTests ? mapYarbaPortfolio(mockYarbaPortfolioContent) : null
  );
  const [loading, setLoading] = useState(!useMockInTests);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (useMockInTests) {
      return;
    }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const content = await fetchPortfolioContent();
        if (!cancelled) {
          setData(mapYarbaPortfolio(content));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load portfolio data.');
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      data,
      loading,
      error,
    }),
    [data, loading, error]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <p className="text-secondary text-lg">Loading portfolio...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <h1 className="text-white text-2xl font-bold mb-3">Unable to load portfolio</h1>
          <p className="text-secondary">{error ?? 'Portfolio data is unavailable.'}</p>
        </div>
      </div>
    );
  }

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export const usePortfolio = (): PortfolioData => {
  const context = useContext(PortfolioContext);
  if (!context?.data) {
    throw new Error('usePortfolio must be used within PortfolioProvider after data loads.');
  }
  return context.data;
};
