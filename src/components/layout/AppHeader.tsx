import { UserCircle2 } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';
import CurrentDateTime from '@/components/dashboard/CurrentDateTime';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      <div className="flex items-center gap-2 md:hidden">
        <SidebarTrigger />
      </div>
      <Logo className="h-6 text-foreground" />
      <div className="ml-auto flex items-center gap-4">
        <CurrentDateTime />
        <UserCircle2 className="h-7 w-7 text-primary hover:text-primary/80 cursor-pointer" />
      </div>
    </header>
  );
}
