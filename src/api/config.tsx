import { BriefcaseIcon, ListTodoIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { HomeIcon, TicketIcon } from '@/components/core/icons-core';

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
    title: 'Tickets',
    description: 'Administra tus tickets',
    icon: <TicketIcon className={ICON_SIZE_CLASS} />,
    link: '/tickets',
  },
  {
    title: 'Proyectos',
    description: 'Administra tus proyectos',
    icon: <BriefcaseIcon className={ICON_SIZE_CLASS} />,
    link: '/projects',
  },
  {
    title: 'Tareas',
    description: 'Administra tus tareas',
    icon: <ListTodoIcon className={ICON_SIZE_CLASS} />,
    link: '/tasks',
  },
];
