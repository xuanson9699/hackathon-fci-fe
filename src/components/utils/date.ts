import dayjs, { extend } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);

import { DATE_FORMAT_DDMMYYYY } from '../constants';

interface FormatDateTimeParams {
  date: Date | string | undefined;
  format?: string;
  keepUtc?: boolean;
}

extend(customParseFormat);

const SUPPORTED_FORMATS = [
  'DD.MM.YYYY',
  'DD/MM/YYYY',
  'YYYY-MM-DD',
  'MM-DD-YYYY',
  'YYYY/MM/DD',
  'YYYYMMDD',
];

const formatDateTime = ({
  date,
  format = DATE_FORMAT_DDMMYYYY,
  keepUtc = true,
}: FormatDateTimeParams): string => {
  if (!date) return '---';

  let parsedDate;

  if (date instanceof Date || dayjs(date).isValid()) {
    parsedDate = keepUtc ? dayjs.utc(date) : dayjs(date);
  } else if (typeof date === 'string') {
    for (const fmt of SUPPORTED_FORMATS) {
      const candidate = keepUtc ? dayjs.utc(date, fmt, true) : dayjs(date, fmt, true);
      if (candidate.isValid()) {
        parsedDate = candidate;
        break;
      }
    }
  }

  return parsedDate?.isValid() ? parsedDate.format(format) : '---';
};

const convertLocalToUTC = (localDate: string | Date): string => {
  return dayjs(localDate).utc().format();
};

const convertLocalTimeForSearch = (localDate: string | Date): string => {
  const parsed = dayjs(localDate);
  return dayjs.utc(parsed.format('YYYY-MM-DDTHH:mm:ss')).format();
};

export { formatDateTime, convertLocalToUTC, convertLocalTimeForSearch };
