import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { GET_ALL_CENTER_QUERY_KEY } from '@/components/constants';
import { useDebouncedValue } from '@/components/hooks';
import ButtonBase from '@/components/ui/button-base';
import useCenterService from '@/services/center.service';

import { FilterConditionType } from '..';
import DrawerAddNew from './DrawerAddNew';

interface FilterBarProps {
  filterCondition: FilterConditionType;
  setFilterCondition: Dispatch<SetStateAction<FilterConditionType>>;
  defaultFilter: FilterConditionType;
}

const FilterBar = () => {
  const isResetting = useRef(false);
  const [openDrawerAdd, setOpenDrawerAdd] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { createCenters } = useCenterService();

  const createRestaurantMutation = useMutation({
    mutationFn: () => createCenters(),
    onSuccess: () => {
      // onClose();
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_CENTER_QUERY_KEY],
      });
    },
  });

  const onClick = () => {
    createRestaurantMutation.mutate();
  };

  return (
    <>
      <div className="flex items-conter justify-between">
        <ButtonBase onClick={onClick}>Create</ButtonBase>
        {/* <span />
        <ButtonBase
          icon={<PlusOutlined className="text-xs text-white" />}
          type="primary"
          className="text-secondary"
          onClick={() => setOpenDrawerAdd(true)}
        >
          Add new restaurant
        </ButtonBase> */}
      </div>
      {openDrawerAdd && <DrawerAddNew onClose={() => setOpenDrawerAdd(false)} />}
    </>
  );
};
export default FilterBar;
