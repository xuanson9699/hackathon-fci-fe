import { Button, Col, Drawer, Input, Row } from "antd";
import { Controller, useForm } from "react-hook-form";

import FormFiled from "@/components/ui/form-field";

type DrawerAddNewProps = {
  onClose: () => void;
};

type FormValues = {
  restaurant_name: string;
  address: string;
};

const DrawerAddNew = ({ onClose }: DrawerAddNewProps) => {
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {},
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {};

  return (
    <Drawer open onClose={onClose} width={"35%"} title="Add new restaurant">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Controller
              name="restaurant_name"
              control={control}
              rules={{ required: "Restaurant name is required" }}
              render={({ field, fieldState }) => (
                <FormFiled
                  label="Restaurant name"
                  isRequire
                  error={fieldState.error?.message}
                >
                  <Input {...field} placeholder="Please enter" />
                </FormFiled>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field, fieldState }) => (
                <FormFiled
                  label="Address"
                  isRequire
                  error={fieldState.error?.message}
                >
                  <Input {...field} placeholder="Please enter" />
                </FormFiled>
              )}
            />
          </Col>
        </Row>
        <div className="flex gap-4 justify-end">
          <Button>Cancel</Button>
          <Button
            htmlType="submit"
            type="primary"
            disabled={!isDirty || !isValid}
          >
            Save
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default DrawerAddNew;
