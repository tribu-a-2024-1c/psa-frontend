import type { ReactNode } from 'react';

import { Header } from './header';
import { Sidebar } from './sidebar';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 pl-20 pr-6 pt-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
