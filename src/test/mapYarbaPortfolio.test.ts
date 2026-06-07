import { describe, expect, it } from 'vitest';

import { mockYarbaPortfolioContent } from '../fixtures/portfolioContent';
import { mapYarbaPortfolio } from '../utils/mapYarbaPortfolio';

describe('mapYarbaPortfolio', () => {
  it('maps yarba content into portfolio section data', () => {
    const mapped = mapYarbaPortfolio(mockYarbaPortfolioContent);

    expect(mapped.fullName).toBe('Muja Kayadan');
    expect(mapped.displayName).toBe('Muja');
    expect(mapped.typedItems).toContain('Software Engineer');
    expect(mapped.education).toHaveLength(1);
    expect(mapped.experiences).toHaveLength(1);
    expect(mapped.projects).toHaveLength(1);
    expect(mapped.awards).toHaveLength(1);
    expect(mapped.aboutBullets.length).toBeGreaterThan(0);
  });
});
