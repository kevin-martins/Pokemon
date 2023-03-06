import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: JSX.Element | JSX.Element[]
}

const Button = ({ children, ...props }: ButtonProps) => (
  <button {...props}>
    {children}
  </button>
);

export default Button;