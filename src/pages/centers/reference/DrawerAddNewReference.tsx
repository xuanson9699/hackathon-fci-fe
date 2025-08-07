import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Drawer, Input, Row } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import {
  GET_CENTER_DETAIL_QUERY_KEY,
  GET_REFERENCE_BY_PROJECT_QUERY_KEY,
} from '@/components/constants';
import FormFiled from '@/components/ui/form-field';
import useCenterService from '@/services/center.service';

type DrawerAddNewReferenceProps = {
  onClose: () => void;
  projectId: string;
  centerId: string;
};

type FormValues = {
  page_id: string;
  page_title: string;
  description: string;
};

const DrawerAddNewReference = ({ onClose, projectId, centerId }: DrawerAddNewReferenceProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      page_id: '',
      page_title: '',
      description: '',
    },
  });

  const queryClient = useQueryClient();

  const { createReference } = useCenterService();

  const createReferenceMutation = useMutation<FormValues>({
    mutationFn: (payload) => createReference(projectId, { ...payload, center_id: centerId }),
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: [GET_REFERENCE_BY_PROJECT_QUERY_KEY],
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    createReferenceMutation.mutate(data);
  };

  return (
    <Drawer open onClose={onClose} width={'35%'} title="Add new reference">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              name="page_id"
              control={control}
              rules={{ required: 'Page id is required' }}
              render={({ field, fieldState }) => (
                <FormFiled label="Page id" isRequire error={fieldState.error?.message}>
                  <Input {...field} placeholder="Please enter" />
                </FormFiled>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="page_title"
              control={control}
              rules={{ required: 'Page title is required' }}
              render={({ field, fieldState }) => (
                <FormFiled label="Page title" isRequire error={fieldState.error?.message}>
                  <Input {...field} placeholder="Please enter" />
                </FormFiled>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
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

export default DrawerAddNewReference;
