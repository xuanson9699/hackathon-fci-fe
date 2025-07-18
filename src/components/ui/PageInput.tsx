import { useEffect, useState } from 'react';

import { Input, InputProps } from 'antd';

type PageInputProps = {
  value: number;
  totalPage: number;
  onChange: (page: number) => void;
} & Omit<InputProps, 'value' | 'onChange'>;

export default function PageInput({ value, totalPage, onChange, ...props }: PageInputProps) {
  const [input, setInput] = useState(value?.toString());

  useEffect(() => {
    setInput(value?.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (val === '') {
      setInput(val);
    } else if (/^[0-9]+$/.test(val)) {
      const num = parseInt(val);
      if (num <= totalPage) {
        setInput(val);
      }
    }
  };

  const commit = () => {
    if (input === '') {
      onChange(1);
    } else {
      const num = parseInt(input);
      if (num >= 1 && num <= totalPage) {
        onChange(num);
      } else {
        setInput(value?.toString());
      }
    }
  };

  return (
    <Input
      {...props}
      value={input}
      onChange={handleChange}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit();
      }}
    />
  );
}
