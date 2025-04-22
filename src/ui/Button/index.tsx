import React from "react";
import { StyledButton } from "./index.styles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: React.PropsWithChildren<ButtonProps>) {

  return <StyledButton {...props}>{children}</StyledButton>
}