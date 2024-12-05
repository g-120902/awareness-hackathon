import clsx from 'clsx';
import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  label: string;
}

export function IconButton({ icon, label }: IconButtonProps) {
  return (
    <div className={clsx(`flex items-center gap-3 bg-navy-blue px-4 py-2 rounded-md hover:bg-blue-hover`)}>
      {/* Icon passed as a prop, styled dynamically */}
      <div className={clsx`h-5 w-5 text-ivory`}>
        {icon}
      </div>
      {/* Button label */}
      <span className={clsx`text-ivory`}>{label}</span>
    </div>
  );
}
