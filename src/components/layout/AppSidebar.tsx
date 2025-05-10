import Link from 'next/link';
import { Home, DollarSign, Users, Settings, BarChart3 } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/financeiro', label: 'Financeiro', icon: DollarSign },
  { href: '/clientes', label: 'Clientes', icon: Users },
  { href: '/metricas', label: 'Métricas', icon: BarChart3 },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-3">
        <Logo className="h-6 text-sidebar-foreground hidden group-data-[state=expanded]:block" />
         <div className="block group-data-[state=expanded]:hidden">
          <svg width="24" height="24" viewBox="0 0 100 100" fill="currentColor" aria-label="Superlógica Icon">
            <circle cx="50" cy="30" r="10" />
            <rect x="30" y="50" width="40" height="30" rx="5" />
          </svg>
        </div>
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  tooltip={{ children: item.label, side: 'right', className: 'font-sans' }}
                  asChild
                >
                  <a>
                    <item.icon />
                    <span className="font-sans">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        {/* Placeholder for potential footer content like user profile or logout */}
         <Button variant="ghost" className="w-full justify-start group-data-[collapsible=icon]:justify-center font-sans">
            <Settings className="group-data-[collapsible=icon]:mr-0 mr-2"/>
            <span className="group-data-[state=expanded]:inline hidden">Support</span>
         </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
