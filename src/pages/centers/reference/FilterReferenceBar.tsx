import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useDebouncedValue } from '@/components/hooks';
import ButtonBase from '@/components/ui/button-base';
import FormFiled from '@/components/ui/form-field';

import { FilterConditionType } from '..';
import DrawerAddNewReference from './DrawerAddNewReference';

interface FilterCustomerBarProps {
  filterCondition: FilterConditionType;
  setFilterCondition: Dispatch<SetStateAction<FilterConditionType>>;
}

const FilterReferenceBar = ({ filterCondition, setFilterCondition }: FilterCustomerBarProps) => {
  const { id, projectId } = useParams<{ projectId: string; id: string }>();

  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);

  const { control, watch, reset, setValue } = useForm<any>({
    defaultValues: {
      search_term: filterCondition.search_term || '',
    },
  });

  const search_term = useDebouncedValue(watch('search_term'));

  useEffect(() => {
    const condition = {
      search_term,
    };

    setFilterCondition((prevFilter: FilterConditionType) => ({
      ...prevFilter,
      ...condition,
    }));
  }, [search_term]);

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
              <FormFiled label="Project name">
                <Input
                  {...field}
                  allowClear
                  placeholder={''}
                  prefix={<SearchOutlined className="text-gray-400" />}
                  onClear={() => setFilterCondition({ ...filterCondition, search_term: '' })}
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
            Create new reference
          </ButtonBase>
        </FormFiled>
      </div>

      {isShowDrawer && (
        <DrawerAddNewReference
          onClose={() => setIsShowDrawer(false)}
          projectId={projectId ?? ''}
          centerId={id ?? ''}
        />
      )}
    </>
  );
};
export default FilterReferenceBar;
