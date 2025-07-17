import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';

import { ReloadOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';

import { useDebouncedValue } from '@/components/hooks';
import ButtonBase from '@/components/ui/button-base';
import DateRangePicker from '@/components/ui/date-range-picker';
import { generateUUID } from '@/components/utils';
import { UploadItem, UploadStatus } from '@/types';

import { FilterConditionType } from '..';
import { simulateProgressRead } from '../helper';
import { useMutation } from '@tanstack/react-query';
import useRestaurantService from '@/services/restaurant.service';
import { useParams } from 'react-router-dom';

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

  const { control, watch, reset } = useForm<any>({
    defaultValues: {
      search_term: filterCondition.search_term,
      dateRange:
        filterCondition.start_time && filterCondition.end_time
          ? [dayjs(filterCondition.start_time), dayjs(filterCondition.end_time)]
          : null,
    },
  });

  const search_term = useDebouncedValue(watch('search_term'));
  const dateRange = watch('dateRange');

  useEffect(() => {
    if (isResetting.current) return;
    let start_time = undefined;
    let end_time = undefined;

    if (dateRange && dateRange.length === 2) {
      start_time = dateRange[0].startOf('day').format('YYYY-MM-DD');
      end_time = dateRange[1].endOf('day').format('YYYY-MM-DD');
    }

    const condition = {
      search_term,
      start_time,
      end_time,
    };

    setFilterCondition((prevFilter: FilterConditionType) => ({
      ...prevFilter,
      ...condition,
    }));
  }, [search_term, dateRange, setFilterCondition]);

  const handleResetFilter = () => {
    isResetting.current = true;
    reset({
      search_term: defaultFilter.search_term,
      dateRange: null,
    });

    setTimeout(() => {
      isResetting.current = false;
      setFilterCondition({
        ...defaultFilter,
      });
    }, 0);
  };

  const updateClaimMutation = useMutation({
    mutationFn: (file: File) => uploadVideo(file, id),
    onSuccess: (data) => {
     
    },
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
          updateClaimMutation.mutate(item.file)
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
          <Controller
            name="dateRange"
            control={control}
            render={({ field: { ref: _ref, ...rest } }) => (
              <DateRangePicker {...rest} className="w-full sm:w-76" allowClear />
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
          icon={<UploadOutlined />}
          type="primary"
          className="text-secondary"
          onClick={handleClickUpload}
          disabled={checkIsDisableButton}
          loading={checkIsDisableButton}
        >
          Upload Video
        </ButtonBase>
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
