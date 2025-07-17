import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { useDebouncedValue } from '@/components/hooks';
import ButtonBase from '@/components/ui/button-base';
import DateRangePicker from '@/components/ui/date-range-picker';

import { FilterConditionType } from '..';
import DrawerAddNew from './DrawerAddNew';

interface FilterBarProps {
  filterCondition: FilterConditionType;
  setFilterCondition: Dispatch<SetStateAction<FilterConditionType>>;
  defaultFilter: FilterConditionType;
}

const FilterBar = ({ filterCondition, setFilterCondition, defaultFilter }: FilterBarProps) => {
  const isResetting = useRef(false);
  const [openDrawerAdd, setOpenDrawerAdd] = useState<boolean>(false);

  const { control, watch, reset } = useForm<any>({
    defaultValues: {
      search_term: filterCondition.search_term,
    },
  });

  const search_term = useDebouncedValue(watch('search_term'));

  useEffect(() => {
    if (isResetting.current) return;

    const condition = {
      search_term,
    };

    setFilterCondition((prevFilter: FilterConditionType) => ({
      ...prevFilter,
      ...condition,
    }));
  }, [search_term, setFilterCondition]);

  const handleResetFilter = () => {
    isResetting.current = true;
    reset({
      search_term: defaultFilter.search_term,
    });

    setTimeout(() => {
      isResetting.current = false;
      setFilterCondition({
        ...defaultFilter,
      });
    }, 0);
  };

  return (
    <>
      <div className="flex items-conter justify-between">
        <div className="flex gap-4">
          <Controller
            name="search_term"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                allowClear
                placeholder={''}
                prefix={<SearchOutlined className="text-gray-400" />}
                onClear={() => setFilterCondition({ ...filterCondition, search_term: '' })}
                className="w-full sm:w-88"
              />
            )}
          />

          <Button
            icon={<ReloadOutlined className="text-xs" />}
            type="default"
            className="text-secondary"
            onClick={handleResetFilter}
          >
            Clear
          </Button>
        </div>
        <ButtonBase
          icon={<PlusOutlined className="text-xs text-white" />}
          type="primary"
          className="text-secondary"
          onClick={() => setOpenDrawerAdd(true)}
        >
          Add new restaurant
        </ButtonBase>
      </div>
      {openDrawerAdd && <DrawerAddNew onClose={() => setOpenDrawerAdd(false)} />}
    </>
  );
};
export default FilterBar;
