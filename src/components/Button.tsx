import { ChevronRight } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  variant?: 'primary' | 'secondary';
};

const buttonVariants = {
  primary: 'bg-f1-red hover:bg-f1-red-hover',
  secondary: 'home-secondary-button border border-white/20',
};

const Button = ({
  text,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-md px-5 py-2.5 transition-colors ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      <span className="text-sm font-bold text-white backdrop-blur-sm">
        {text}
      </span>
      <ChevronRight className="home-button-arrow size-4 text-white" />
    </button>
  );
};

export default Button;
