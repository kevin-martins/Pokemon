import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: JSX.Element | JSX.Element[]
}

// must add style
const Button = ({ children, ...props }: ButtonProps) => (
  <button {...props}>
    {children}
  </button>
);

export default Button;