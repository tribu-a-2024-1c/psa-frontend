import type { ReactNode } from 'react';

import {
  BriefcaseIcon,
  HomeIcon,
  TicketIcon,
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
    title: 'Home',
    icon: <HomeIcon className="size-5" />,
    link: '/',
  },
  {
    title: 'Projects',
    description: 'Manage your projects',
    icon: <BriefcaseIcon className={ICON_SIZE_CLASS} />,
    link: '/projects',
  },
  {
    title: 'Tickets',
    description: 'Manage your tickets',
    icon: <TicketIcon className={ICON_SIZE_CLASS} />,
    link: '/tickets',
  },
];
