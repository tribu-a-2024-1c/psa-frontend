import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { PanelLeftIcon } from './icons-core';
import { ModeToggle } from './mode-toggle';
import { NavBar } from './navbar';

export const Header = () => {
  return (
    <header className="flex h-14 w-full items-center gap-4 border-b bg-background px-4 sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="sm:hidden" size="icon" variant="outline">
            <PanelLeftIcon className="size-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-xs" side="left">
          <NavBar />
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative size-8 rounded-full" variant="outline">
              <Avatar>
                <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" alignOffset={-4} className="w-56">
            <DropdownMenuLabel>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium leading-none">Soport Engineer</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    soport@psa.com
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
