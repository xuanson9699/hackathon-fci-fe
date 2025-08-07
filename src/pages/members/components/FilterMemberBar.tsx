import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useDebouncedValue } from '@/components/hooks';
import ButtonBase from '@/components/ui/button-base';
import FormFiled from '@/components/ui/form-field';

import { FilterConditionType } from '..';
import DrawerAddNewMember from './DrawerAddNew';

interface FilterCustomerBarProps {
  filterCondition: FilterConditionType;
  setFilterCondition: Dispatch<SetStateAction<FilterConditionType>>;
  defaultFilter: FilterConditionType;
}

const FilterCustomerBar = ({
  filterCondition,
  setFilterCondition,
  defaultFilter,
}: FilterCustomerBarProps) => {
  const { id } = useParams<{ id: string }>();

  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);

  const { control, watch, reset, setValue } = useForm<any>({
    defaultValues: {
      name: filterCondition.name,
    },
  });

  const name = useDebouncedValue(watch('name'));

  useEffect(() => {
    const condition = {
      name,
    };

    setFilterCondition((prevFilter: FilterConditionType) => ({
      ...prevFilter,
      ...condition,
    }));
  }, [name]);

  const handleClickButtonAddNew = () => {
    setIsShowDrawer(true);
  };

  return (
    <>
      <div className="flex items-conter justify-between">
        <div className="flex gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormFiled label="Member name">
                <Input
                  {...field}
                  allowClear
                  placeholder={''}
                  prefix={<SearchOutlined className="text-gray-400" />}
                  onClear={() => setFilterCondition({ ...filterCondition, name: '' })}
                  className="w-full sm:w-88"
                />
              </FormFiled>
            )}
          />
        </div>
        <FormFiled>
          <ButtonBase
            icon={<PlusOutlined />}
            type="primary"
            className="text-secondary"
            onClick={handleClickButtonAddNew}
          >
            Create new member
          </ButtonBase>
        </FormFiled>
      </div>

      {isShowDrawer && <DrawerAddNewMember onClose={() => setIsShowDrawer(false)} id={id ?? ''} />}
    </>
  );
};
export default FilterCustomerBar;
