import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';

import { ReloadOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, InputNumber } from 'antd';
import dayjs from 'dayjs';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { useDebouncedValue } from '@/components/hooks';
import ButtonBase from '@/components/ui/button-base';
import DateRangePicker from '@/components/ui/date-range-picker';
import FormFiled from '@/components/ui/form-field';
import { generateUUID } from '@/components/utils';
import { convertLocalTimeForSearch } from '@/components/utils/date';
import useRestaurantService from '@/services/restaurant.service';
import { UploadItem, UploadStatus } from '@/types';

import { FilterConditionType } from '..';
import { simulateProgressRead } from '../helper';

interface FilterCustomerBarProps {
  filterCondition: FilterConditionType;
  setFilterCondition: Dispatch<SetStateAction<FilterConditionType>>;
  defaultFilter: FilterConditionType;
  setUploadQueue: React.Dispatch<React.SetStateAction<UploadItem[]>>;
  uploadQueue: UploadItem[];
  setShowUploadDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterCustomerBar = ({
  filterCondition,
  setFilterCondition,
  defaultFilter,
  setUploadQueue,
  uploadQueue,
  setShowUploadDrawer = () => {},
}: FilterCustomerBarProps) => {
  const { id } = useParams<{ id: string }>();
  const isResetting = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadVideo } = useRestaurantService();

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

  const handleResetFilter = () => {
    isResetting.current = true;
    reset({
      person_external_id: defaultFilter.person_external_id,
      dateRange: null,
      duration: null,
    });

    setTimeout(() => {
      isResetting.current = false;
      setFilterCondition({
        ...defaultFilter,
      });
    }, 0);
  };

  const updateClaimMutation = useMutation({
    mutationFn: (file: File) => uploadVideo(file, id ?? ''),
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowUploadDrawer(true);
    const files = Array.from(e.target.files || []);
    const uploads = files.map((file) => ({
      id: generateUUID(),
      file,
      progress: 0,
      status: 'reading' as UploadStatus,
    }));

    setUploadQueue((prev) => [...prev, ...uploads]);

    uploads.forEach((item) => {
      simulateProgressRead(
        item.file,
        (percent) => {
          setUploadQueue((prev) =>
            prev.map((u) => (u.id === item.id ? { ...u, progress: percent } : u)),
          );
        },
        () => {
          setUploadQueue((prev) =>
            prev.map((u) => (u.id === item.id ? { ...u, status: 'done' } : u)),
          );
          updateClaimMutation.mutate(item.file);
        },
        () => {
          setUploadQueue((prev) =>
            prev.map((u) => (u.id === item.id ? { ...u, status: 'error' } : u)),
          );
        },
      );
    });
  };

  const checkIsDisableButton = useMemo(() => {
    const isDisable = uploadQueue?.some((item) => item.status === 'reading');
    return isDisable;
  }, [uploadQueue]);

  const handleClickUpload = () => {
    setUploadQueue([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="flex items-conter justify-between">
        <div className="flex gap-4">
          <Controller
            name="person_external_id"
            control={control}
            render={({ field }) => (
              <FormFiled label="Customer id">
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
          <Controller
            name="dateRange"
            control={control}
            render={({ field: { ref: _ref, ...rest } }) => (
              <FormFiled label="Start time - End time">
                <DateRangePicker {...rest} className="w-full sm:w-96" allowClear showTime />
              </FormFiled>
            )}
          />

          <FormFiled label="Duration (minutes)">
            <InputNumber
              className="w-full sm:w-32"
              value={duration}
              onChange={(value) => setDuration(value)}
            />
          </FormFiled>

          <FormFiled>
            <Button
              icon={<ReloadOutlined className="text-xs" />}
              type="default"
              className="text-secondary"
              onClick={handleResetFilter}
            >
              Clear
            </Button>
          </FormFiled>
        </div>
        <FormFiled>
          <ButtonBase
            icon={<UploadOutlined />}
            type="primary"
            className="text-secondary"
            onClick={handleClickUpload}
            disabled={checkIsDisableButton}
            loading={checkIsDisableButton}
          >
            Upload Video
          </ButtonBase>
        </FormFiled>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        multiple
        hidden
        onChange={handleUpload}
      />
    </>
  );
};
export default FilterCustomerBar;
