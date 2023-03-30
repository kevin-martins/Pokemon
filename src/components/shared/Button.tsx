import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: JSX.Element | JSX.Element[]
}

// TODO: what is the point of this component?
const Button = ({ children, ...props }: ButtonProps) => (
  <button {...props}>
    {children}
  </button>
);

export default Button;