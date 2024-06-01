import type { ReactNode } from 'react';

import {
  HomeIcon,
  LayoutGridIcon,
  PackageIcon,
} from '@/components/core/icons-core';

export type MenuItem = {
  title: string;
  description?: string;
  icon: ReactNode;
  link: string;
};

export const ICON_SIZE_CLASS = 'size-5';

export const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: <HomeIcon className="size-5" />,
    link: '/',
  },
  {
    title: 'Projects',
    description: 'Manage your projects',
    icon: <PackageIcon className={ICON_SIZE_CLASS} />,
    link: '/components',
  },
  {
    title: 'Tickets',
    description: 'Manage your tickets',
    icon: <LayoutGridIcon className={ICON_SIZE_CLASS} />,
    link: '/domains',
  },
];
