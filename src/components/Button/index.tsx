import { FC, PropsWithChildren } from 'react';

import styles from './styles.module.scss';
type ButtonType = 'filled' | 'outline';
type Properties = {
  onClick?: () => void;
  variant?: ButtonType;
  className?: unknown;
  submit?: boolean;
};

const bType: Record<ButtonType, unknown> = {
  filled: styles.filled,
  outline: styles.outline,
};

export const Button: FC<PropsWithChildren<Properties>> = ({
  onClick,
  variant = 'filled',
  children,
  className,
  submit,
}) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      className={`${styles.button} ${bType[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
