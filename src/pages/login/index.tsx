import { memo } from 'react';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Input } from 'antd';
import { clsx } from 'clsx';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/components/constants';
import UserLoginLayout from '@/components/layouts/user-login-layout';
import ButtonBase from '@/components/ui/button-base';
import FormFiled from '@/components/ui/form-field';
import useLoginService from '@/services/login.service';
import { LoginPayload } from '@/types';

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginPayload>({
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const { login } = useLoginService();

  const updateClaimMutation = useMutation({
    mutationFn: (data: LoginPayload) => login(data),
    onSuccess: (data) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, data?.access_token);
      navigate('/restaurant');
    },
  });

  const onSubmit = (formValues: LoginPayload) => {
    updateClaimMutation.mutate(formValues);
  };

  return (
    <UserLoginLayout>
      <div className="p-5 bg-white rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="text-center text-brand font-semibold text-3xl b-bottom">Login</div>
            <Controller
              control={control}
              name={'username'}
              rules={{
                required: {
                  value: true,
                  message: 'Username is required',
                },
                // pattern: {
                //   value: EMAIL_REGEX,
                //   message: 'Email is invalid',
                // },
                validate: {
                  notEmpty: (value) => value?.trim() !== '' || 'Username is invalid',
                },
              }}
              render={({ field, fieldState }) => (
                <FormFiled label="User name" error={fieldState?.error?.message} isRequire>
                  <Input
                    className={clsx(fieldState.error && 'border-info_red', 'min-w-0 md:min-w-80')}
                    {...field}
                    value={field.value ?? ''}
                  />
                </FormFiled>
              )}
            />
            <Controller
              control={control}
              name={'password'}
              rules={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
                validate: {
                  notEmpty: (value) => value?.trim() !== '' || 'Password is required',
                },
              }}
              render={({ field, fieldState }) => (
                <FormFiled label={'Password'} isRequire error={fieldState?.error?.message}>
                  <Input.Password
                    className={clsx(
                      fieldState.error && 'border-info_red',
                      'min-w-0 md:min-w-[300px]',
                    )}
                    {...field}
                    value={field.value ?? ''}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </FormFiled>
              )}
            />

            <div>
              <ButtonBase loading={false} type="primary" htmlType="submit" className="w-full">
                Submit
              </ButtonBase>
            </div>
          </div>
        </form>
      </div>
    </UserLoginLayout>
  );
};

export default memo(Login);
