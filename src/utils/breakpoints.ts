/** Matches Tailwind `sm` — viewports below 640px are treated as mobile. */
export const MOBILE_MAX_WIDTH = 639;
export const MOBILE_MEDIA_QUERY = `(max-width: ${MOBILE_MAX_WIDTH}px)`;

export const subscribeToMobileQuery = (callback: (matches: boolean) => void) => {
  const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
  callback(mediaQuery.matches);

  const handler = (event: MediaQueryListEvent) => callback(event.matches);
  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
};
