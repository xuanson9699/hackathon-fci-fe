import { ConfigProvider, DatePicker } from 'antd';
import enUS from 'antd/es/locale/en_US';
import viVN from 'antd/es/locale/vi_VN';

import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;

export default function DateRangePicker(props: RangePickerProps) {
  // const lang = (localStorage.getItem(AppConfig.LANG_TOKEN) as Lang | undefined) ?? 'en';

  const lang = 'en';
  const localeList = {
    en: enUS,
    vi: viVN,
  };
  return (
    <ConfigProvider locale={localeList[lang]}>
      <RangePicker {...props} />
    </ConfigProvider>
  );
}
