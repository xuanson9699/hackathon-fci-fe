import dayjs, { extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { FORMAT_DATE } from '../constants';

extend(customParseFormat);

const SUPPORTED_FORMATS = [
  'DD.MM.YYYY',
  'DD/MM/YYYY',
  'YYYY-MM-DD',
  'MM-DD-YYYY',
  'YYYY/MM/DD',
  'YYYYMMDD',
];

const formatDateTime = (date: Date | string | undefined, format: string = FORMAT_DATE): string => {
  if (!date) return '---';

  let parsedDate;

  if (date instanceof Date || dayjs(date).isValid()) {
    parsedDate = dayjs(date);
  } else if (typeof date === 'string') {
    for (const fmt of SUPPORTED_FORMATS) {
      const candidate = dayjs(date, fmt, true);
      if (candidate.isValid()) {
        parsedDate = candidate;
        break;
      }
    }
  }

  return parsedDate?.isValid() ? parsedDate.format(format) : '---';
};

export { formatDateTime };
