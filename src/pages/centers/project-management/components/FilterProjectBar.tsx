import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useDebouncedValue } from '@/components/hooks';
import ButtonBase from '@/components/ui/button-base';
import FormFiled from '@/components/ui/form-field';

import { FilterConditionType } from '..';
import DrawerAddNewPrject from './DrawerAddNew';

interface FilterCustomerBarProps {
  filterCondition: FilterConditionType;
  setFilterCondition: Dispatch<SetStateAction<FilterConditionType>>;
  defaultFilter: FilterConditionType;
}

const FilterProjectBar = ({
  filterCondition,
  setFilterCondition,
  defaultFilter,
}: FilterCustomerBarProps) => {
  const { id } = useParams<{ id: string }>();

  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);

  const { control, watch, reset, setValue } = useForm<any>({
    defaultValues: {
      project_name: filterCondition.project_name || '',
    },
  });

  const project_name = useDebouncedValue(watch('project_name'));

  useEffect(() => {
    const condition = {
      project_name,
    };

    setFilterCondition((prevFilter: FilterConditionType) => ({
      ...prevFilter,
      ...condition,
    }));
  }, [project_name]);

  const handleClickButtonAddNew = () => {
    setIsShowDrawer(true);
  };

  return (
    <>
      <div className="flex items-conter justify-between">
        <div className="flex gap-4">
          <Controller
            name="project_name"
            control={control}
            render={({ field }) => (
              <FormFiled label="Page title">
                <Input
                  {...field}
                  allowClear
                  placeholder={''}
                  prefix={<SearchOutlined className="text-gray-400" />}
                  onClear={() => setFilterCondition({ ...filterCondition, project_name: '' })}
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
            Create new project
          </ButtonBase>
        </FormFiled>
      </div>

      {isShowDrawer && <DrawerAddNewPrject onClose={() => setIsShowDrawer(false)} id={id ?? ''} />}
    </>
  );
};
export default FilterProjectBar;
