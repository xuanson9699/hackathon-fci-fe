import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Drawer, Input, Row } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { GET_ALL_CENTER_QUERY_KEY, GET_CENTER_DETAIL_QUERY_KEY } from '@/components/constants';
import FormFiled from '@/components/ui/form-field';
import useCenterService from '@/services/center.service';

type DrawerAddNewPrjectProps = {
  onClose: () => void;
  id: string;
};

type FormValues = {
  name: string;
  description: string;
};

const DrawerAddNewPrject = ({ onClose, id }: DrawerAddNewPrjectProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const queryClient = useQueryClient();

  const { createProject } = useCenterService();

  const createProjectMutation = useMutation<FormValues>({
    mutationFn: (payload) => createProject(id, payload),
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: [GET_CENTER_DETAIL_QUERY_KEY],
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    createProjectMutation.mutate({ name: data.name, description: data.description });
  };

  return (
    <Drawer open onClose={onClose} width={'35%'} title="Add new project">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Project name is required' }}
              render={({ field, fieldState }) => (
                <FormFiled label="Project name" isRequire error={fieldState.error?.message}>
                  <Input {...field} placeholder="Please enter" />
                </FormFiled>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <FormFiled label="Description">
                  <Input.TextArea {...field} placeholder="Please enter" rows={4} />
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

export default DrawerAddNewPrject;
