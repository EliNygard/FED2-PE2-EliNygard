'use client'

import React from "react";
import { StyledButton, ButtonVariant } from "./index.styles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

export default function Button({ children, variant='primary', ...props }: ButtonProps) {

  return <StyledButton variant={variant} {...props}>{children}</StyledButton>
}