import { useEffect, useState } from 'react';

type MediaQueryType = 'sm' | 'md' | 'lg' | 'xl';
const mediaQueryTypeMap = new Map<MediaQueryType, number>([
  ['sm', 600],
  ['md', 768],
  ['lg', 1024],
  ['xl', 1280],
]);

const useMediaQuery = (mediaQuery: MediaQueryType): boolean => {
  const [isBreak, setIsBreak] = useState<boolean>(
    window.innerWidth > (mediaQueryTypeMap.get(mediaQuery) ?? 0),
  );
  const mediaQueryList = window.matchMedia(`(min-width: ${mediaQueryTypeMap.get(mediaQuery)}px)`);

  useEffect(() => {
    const handleChange = (event: MediaQueryListEvent) => {
      setIsBreak(event.matches);
    };
    mediaQueryList.addEventListener('change', handleChange);
    // mediaQueryList.addEventListener('change', handleChange)
    return () => {
      // This is called the cleanup phase aka beforeUnmount
      mediaQueryList.removeEventListener('change', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !isBreak;
};

export default useMediaQuery;
