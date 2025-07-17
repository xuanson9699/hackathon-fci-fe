import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { css, styled } from 'styled-components';

export type CustomButtonType = 'primary' | 'default' | 'link' | 'text' | 'dashed';

interface BaseButtonProps extends AntButtonProps {
  type?: CustomButtonType;
}

// Có thể thêm style theo từng type nếu muốn
const typeStyles: Record<CustomButtonType, ReturnType<typeof css>> = {
  primary: css`
    background-color: #0076cb;
    color: #fff;
    border: none;
    &:hover {
      background-color: #005fa3;
    }
  `,
  default: css`
    color: #005fa3;
  `,
  link: css`
    /* optional custom for link */
  `,
  text: css`
    /* optional custom for text */
  `,
  dashed: css`
    /* optional custom for dashed */
  `,
};

const StyledButton = styled(AntButton)<{ $btntype?: CustomButtonType }>`
  border-radius: 8px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 10px;
  ${({ $btntype }) => $btntype && typeStyles[$btntype]}
  &[disabled], 
  &.ant-btn[disabled] {
    border: none !important;
    transition: opacity 0.2s;
    &:hover {
      background-color: #f0f0f0 !important;
      opacity: 0.75;
    }
  }
`;

const ButtonBase: React.FC<BaseButtonProps> = ({ type = 'default', ...rest }) => {
  return <StyledButton $btntype={type} type={type} {...rest} />;
};

export default ButtonBase;
