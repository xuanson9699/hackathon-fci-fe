import { memo } from 'react';

import { Spin } from 'antd';

const RouteLoading = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Spin size="large" />
    </div>
  );
};

export default memo(RouteLoading);
