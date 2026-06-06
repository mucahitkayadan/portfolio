import { useEffect, useState } from 'react';

import { subscribeToMobileQuery } from '../utils/breakpoints';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => subscribeToMobileQuery(setIsMobile), []);

  return isMobile;
};

export default useIsMobile;
