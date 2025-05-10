import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "disabled" | "narrow";

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background-color: var(--color-brand-blue);
    color: #fff;
    text-transform: uppercase;
    font-size: 1rem;
    width: 100%;
    transition:
      background-color 0.3s,
      color 0.3s;
  `,
  secondary: css`
    background-color: #fff;
    color: var(--color-secondary-font);
    border-width: 1px;
    border-color: var(--color-primary-font);
    text-transform: uppercase;
    font-size: 1rem;
    width: 100%;
  `,
  disabled: css`
    background-color: var(--color-disabled-blue);
    color: var(--color-primary-font);
    pointer-events: none;
    text-transform: uppercase;
    font-size: 1rem;
    width: 100%;
  `,
  narrow: css`
    color: #fff;
    padding: 0;
    text-transform: none;
    font-size: 0.875rem;
    padding: 0;
    width: auto;
    text-transform: capitalize;
  `,
};

export const StyledButton = styled.button<{ $variant?: ButtonVariant }>`
  ${({ $variant = "primary" }) => variantStyles[$variant]};

  border-radius: 6px;
  font-weight: 500;
  padding: 4px 16px 4px 16px;
  transition: background-color 0.2s;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: var(--color-interaction-blue);
  }
  &:disabled {
    background-color: gray;
    pointer-events: none;
  }
`;
