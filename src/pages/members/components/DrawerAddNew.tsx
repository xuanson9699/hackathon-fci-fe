import { useEffect, useMemo } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Drawer, Input, Row, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import {
  GET_ALL_CENTER_QUERY_KEY,
  GET_CENTER_DETAIL_QUERY_KEY,
  GET_USER_LIST_QUERY_KEY,
} from '@/components/constants';
import FormFiled from '@/components/ui/form-field';
import useCenterService from '@/services/center.service';

type DrawerAddNewMemberProps = {
  onClose: () => void;
  id: string;
};

type FormValues = {
  name: string;
  email: string;
  center_id: string;
  project_ids: string[];
};

const DrawerAddNewMember = ({ onClose, id }: DrawerAddNewMemberProps) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const center_id = watch('center_id');

  useEffect(() => {
    setValue('project_ids', []);
  }, [center_id]);

  const queryClient = useQueryClient();

  const { createNewMember, getAll, getDetail } = useCenterService();

  const createMemberMutation = useMutation<FormValues>({
    mutationFn: (payload) => createNewMember(payload),
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: [GET_USER_LIST_QUERY_KEY],
      });
    },
  });

  const { data, isFetching } = useQuery({
    queryKey: [GET_ALL_CENTER_QUERY_KEY, {}],
    queryFn: () => getAll({}),
    keepPreviousData: true,
  });

  const { data: dataProject, isFetching: isFetchingProject } = useQuery({
    queryKey: [GET_CENTER_DETAIL_QUERY_KEY, {}, center_id],
    queryFn: () => getDetail(center_id, {}),
    keepPreviousData: true,
    enabled: !!center_id,
  });

  const optionCenters = useMemo(() => {
    return data?.data?.map((center) => ({
      label: center.name,
      value: center.id,
    }));
  }, [data]);

  console.log('data', data);

  const onSubmit = (data: FormValues) => {
    createMemberMutation.mutate({
      name: data.name,
      email: data.email,
      center_id: data.center_id,
      project_ids: data.project_ids,
    });
  };

  return (
    <Drawer open onClose={onClose} width={'35%'} title="Add new member">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              name="center_id"
              control={control}
              render={({ field, fieldState }) => (
                <FormFiled label="Center" isRequire error={fieldState.error?.message}>
                  <Select
                    {...field}
                    placeholder="Please enter"
                    options={optionCenters}
                    loading={isFetching}
                  />
                </FormFiled>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'User name is required' }}
              render={({ field, fieldState }) => (
                <FormFiled label="User name" isRequire error={fieldState.error?.message}>
                  <Input {...field} placeholder="Please enter" />
                </FormFiled>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'User email is required' }}
              render={({ field, fieldState }) => (
                <FormFiled label="User email" isRequire error={fieldState.error?.message}>
                  <Input {...field} placeholder="Please enter" />
                </FormFiled>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="project_ids"
              control={control}
              render={({ field, fieldState }) => (
                <FormFiled label="Project" isRequire error={fieldState.error?.message}>
                  <Select
                    {...field}
                    placeholder="Please enter"
                    loading={isFetchingProject}
                    options={dataProject?.data?.map((project) => ({
                      label: project.name,
                      value: project.id,
                    }))}
                    mode="tags"
                  />
                </FormFiled>
              )}
            />
          </Col>
        </Row>
        <div className="flex gap-4 justify-end">
          <Button>Cancel</Button>
          <Button htmlType="submit" type="primary" disabled={!isDirty || !isValid}>
            Save
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default DrawerAddNewMember;
