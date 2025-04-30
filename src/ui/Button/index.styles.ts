import styled, { css } from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'disabled' | 'narrow';

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
  background-color: var(--color-brand-blue);
  color: #fff;
  `,
  secondary: css`
  background-color: #fff;
  color: var(--color-secondary-font);
  border-width: 1px;
  border-color: var(--color-primary-font);
  `,
  disabled: css`
  background-color: var(--color-disabled-blue);
  color: var(--color-primary-font);
  pointer-events: none;
  `,
  narrow: css`
  background-color: var(--color-brand-blue);
  color: #fff;
  padding: 0;
  `

}

export const StyledButton = styled.button<{ variant?: ButtonVariant }>`
  ${({ variant = 'primary'}) => variantStyles[variant]};

  border-radius: 6px;
  text-transform: uppercase;
  font-weight: 500;
  width: 100%;
  padding: 4px 16px 4px 16px;
  cursor: pointer;
  &:disabled
    {
      background-color: gray;
      pointer-events: none;
    }
  
`;