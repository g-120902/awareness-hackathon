'use client'

import React from 'react';
import { Link, usePathname } from '@/i18n/routing';

interface LinkItemProps {
  text: string;
  href: string;
}

const LinkItem: React.FC<LinkItemProps> = ({ text, href }) => {
  const pathName = usePathname();
  const isActive = pathName === href; 
  return (
    <Link
      href={href}
      className={`hover:bg-blue-hover hover:text-white h-full text-base w-40 py-2 flex justify-center items-center px-12 whitespace-nowrap border-pale-blue border-x-[1px] ${
        isActive ? 'bg-pale-blue' :'bg-ivory'
      }`}
    >
      {text}
    </Link>
  );
};

export default LinkItem;
