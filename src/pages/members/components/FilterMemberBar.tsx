import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'antd';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useDebouncedValue } from '@/components/hooks';
import ButtonBase from '@/components/ui/button-base';
import FormFiled from '@/components/ui/form-field';
import { convertLocalTimeForSearch } from '@/components/utils/date';
import useCenterService from '@/services/center.service';

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
  const isResetting = useRef(false);
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);
  const { uploadVideo } = useCenterService();

  const { control, watch, reset, setValue } = useForm<any>({
    defaultValues: {
      person_external_id: filterCondition.person_external_id,
      dateRange:
        filterCondition.start_time && filterCondition.end_time
          ? [dayjs(filterCondition.start_time), dayjs(filterCondition.end_time)]
          : null,
    },
  });

  const person_external_id = useDebouncedValue(watch('person_external_id'));
  const dateRange = watch('dateRange');

  const [duration, setDuration] = useState<any>(null);

  useEffect(() => {
    if (isResetting.current) return;
    let start_time = undefined;
    let end_time = undefined;

    let durationUpdate = duration && +duration > 0 ? duration * 60 : 0;

    if (!Number.isFinite(+duration)) {
      setValue('duration', undefined);
      durationUpdate = 0;
    }

    if (dateRange && dateRange.length === 2) {
      start_time = convertLocalTimeForSearch(dateRange[0]);
      end_time = convertLocalTimeForSearch(dateRange[1]);
    }

    const condition = {
      person_external_id,
      start_time,
      end_time,
      duration: durationUpdate,
    };

    setFilterCondition((prevFilter: FilterConditionType) => ({
      ...prevFilter,
      ...condition,
    }));
  }, [person_external_id, dateRange, duration]);

  const updateClaimMutation = useMutation({
    mutationFn: (file: File) => uploadVideo(file, id ?? ''),
  });

  const handleClickButtonAddNew = () => {
    setIsShowDrawer(true);
  };

  return (
    <>
      <div className="flex items-conter justify-between">
        <div className="flex gap-4">
          <Controller
            name="person_external_id"
            control={control}
            render={({ field }) => (
              <FormFiled label="Member name">
                <Input
                  {...field}
                  allowClear
                  placeholder={''}
                  prefix={<SearchOutlined className="text-gray-400" />}
                  onClear={() => setFilterCondition({ ...filterCondition, person_external_id: '' })}
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

      {isShowDrawer && <DrawerAddNewMember onClose={() => setIsShowDrawer(false)} id={id} />}
    </>
  );
};
export default FilterCustomerBar;
