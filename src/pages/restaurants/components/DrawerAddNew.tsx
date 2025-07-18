import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Col, Drawer, Input, Row } from 'antd';
import { Controller, useForm } from 'react-hook-form';

import { GET_ALL_RESTAURANT_QUERY_KEY } from '@/components/constants';
import FormFiled from '@/components/ui/form-field';
import useRestaurantService from '@/services/restaurant.service';

type DrawerAddNewProps = {
  onClose: () => void;
};

type FormValues = {
  name: string;
};

const DrawerAddNew = ({ onClose }: DrawerAddNewProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });

  const queryClient = useQueryClient();

  const { createRestaurant } = useRestaurantService();

  const createRestaurantMutation = useMutation({
    mutationFn: (payload: { name: string }) => createRestaurant(payload.name),
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_RESTAURANT_QUERY_KEY],
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    createRestaurantMutation.mutate({ name: data.name });
  };

  return (
    <Drawer open onClose={onClose} width={'35%'} title="Add new restaurant">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Restaurant name is required' }}
              render={({ field, fieldState }) => (
                <FormFiled label="Restaurant name" isRequire error={fieldState.error?.message}>
                  <Input {...field} placeholder="Please enter" />
                </FormFiled>
              )}
            />
          </Col>
          {/* <Col span={12}>
            <Controller
              name="address"
              control={control}
              rules={{ required: 'Address is required' }}
              render={({ field, fieldState }) => (
                <FormFiled label="Address" isRequire error={fieldState.error?.message}>
                  <Input {...field} placeholder="Please enter" />
                </FormFiled>
              )}
            />
          </Col> */}
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

export default DrawerAddNew;
