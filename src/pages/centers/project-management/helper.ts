import { RestaurantEventItem } from '@/types';

export const simulateProgressRead = (
  file: File,
  onProgress: (percent: number) => void,
  onDone: () => void,
  onError: () => void,
) => {
  const reader = new FileReader();

  reader.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded * 100) / e.total);
      onProgress(percent);
    }
  };

  reader.onload = () => {
    onProgress(100);
    onDone();
  };

  reader.onerror = onError;

  reader.readAsArrayBuffer(file);
};

export const formatDuration = (rawSeconds: number): string => {
  const totalSeconds = Math.round(rawSeconds);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const parts: string[] = [];

  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0) parts.push(`${s}s`);

  return parts.join(' ');
};

export const isSameDataSource = (a: RestaurantEventItem[], b: RestaurantEventItem[]): boolean => {
  if (a.length !== b.length) return false;

  return a.every((itemA) => {
    const itemB = b.find((item) => item.person_external_id === itemA.person_external_id);
    return itemB && itemB.duration_seconds === itemA.duration_seconds;
  });
};
