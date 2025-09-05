"use client";

import { LogOutButton } from "@/components/auth/LogOut";
import { ThemeSwapper } from "@/components/navbar/ThemeSwapper";
import { cn } from "@/lib/utils";
import { Button } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/tooltip";
import {
  BarChart,
  CalendarClock,
  Castle,
  ExternalLink,
  HelpCircle,
  LayoutDashboard,
  Lightbulb,
  Map,
  Menu,
  Monitor,
  Package,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive?: boolean;
  isCollapsed: boolean;
  className?: string;
}

function NavItem({ icon, title, href, isActive, isCollapsed, className }: NavItemProps) {
  const buttonContent = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 px-3 hover:bg-muted-foreground/30 dark:hover:bg-muted-foreground/50",
        isActive ? "bg-muted-foreground text-background hover:!bg-muted-foreground/80 hover:text-background" : "",
        isCollapsed ? "h-12 px-3" : "h-10 px-3",
        className,
      )}
    >
      {icon}
      {!isCollapsed && <span>{title}</span>}
    </Button>
  );

  return (
    <Link href={href} passHref>
      {isCollapsed ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
            <TooltipContent side="right">{title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        buttonContent
      )}
    </Link>
  );
}

export default function DashboardNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const user = null;

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card border-r transition-all duration-300 sticky top-0",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-row items-center justify-between p-4 border-b line-clamp-1">
        {!isCollapsed && (
          <span className="font-semibold text-xl flex flex-row items-center gap-2 line-clamp-1">ADMIN DASHBOARD</span>
        )}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="ml-auto">
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-2 px-2">
        <NavItem
          icon={<LayoutDashboard size={20} />}
          title="Tableau de bord"
          href="/admin/dashboard"
          isActive={pathname === "/admin/dashboard"}
          isCollapsed={isCollapsed}
        />
        <Separator className="my-2" />

        <NavItem
          icon={<Users size={20} />}
          title="Personnages"
          href="/admin/dashboard/characters"
          isActive={pathname === "/admin/dashboard/characters"}
          isCollapsed={isCollapsed}
        />
        {/* <NavItem
          icon={<Clock size={20} />}
          title="Horaires de stream"
          href="/admin/dashboard/stream-schedule"
          isActive={pathname === "/admin/dashboard/stream-schedule"}
          isCollapsed={isCollapsed}
        /> */}
        <Separator className="my-2" />
        {/* 
        <NavItem
          icon={<Settings size={20} />}
          title="Profils"
          href="/admin/dashboard/settings"
          isActive={pathname === "/admin/dashboard/settings"}
          isCollapsed={isCollapsed}
        /> */}
        {/* <NavItem
          icon={<BarChart3 size={20} />}
          title="Statistiques"
          href="/admin/dashboard/stats"
          isActive={pathname === "/admin/dashboard/stats"}
          isCollapsed={isCollapsed}
        /> */}
        <NavItem
          icon={<Package size={20} />}
          title="Addons"
          href="/admin/dashboard/addons"
          isActive={pathname === "/admin/dashboard/addons"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Zap size={20} />}
          title="WeakAuras"
          href="/admin/dashboard/weak-auras"
          isActive={pathname === "/admin/dashboard/weak-auras"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Monitor size={20} />}
          title="Profils d'addons"
          href="/admin/dashboard/addons-profiles"
          isActive={pathname === "/admin/dashboard/addons-profiles"}
          isCollapsed={isCollapsed}
        />
        <Separator className="my-2" />
        <NavItem
          icon={<Castle size={20} />}
          title="Donjons"
          href="/admin/dashboard/dungeons"
          isActive={pathname === "/admin/dashboard/dungeons"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Map size={20} />}
          title="Routes"
          href="/admin/dashboard/routes"
          isActive={pathname === "/admin/dashboard/routes"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Sparkles size={20} />}
          title="Talents"
          href="/admin/dashboard/talents"
          isActive={pathname === "/admin/dashboard/talents"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Lightbulb size={20} />}
          title="Tips"
          href="/admin/dashboard/tips"
          isActive={pathname === "/admin/dashboard/tips"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<CalendarClock size={20} />}
          title="Changer de saison"
          href="/admin/dashboard/change-season"
          isActive={pathname === "/admin/dashboard/change-season"}
          isCollapsed={isCollapsed}
          className="bg-destructive text-white hover:!bg-destructive/80 hover:text-white"
        />
        <Separator className="my-2" />

        <NavItem
          icon={<Users size={20} />}
          title="Utilisateurs"
          href="/admin/dashboard/users-management"
          isActive={pathname === "/admin/dashboard/users-management"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<HelpCircle size={20} />}
          title="Aide"
          href="/admin/dashboard/help"
          isActive={pathname === "/admin/dashboard/help"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<BarChart size={20} />}
          title="Analytics"
          href="/admin/dashboard/analytics"
          isActive={pathname === "/admin/dashboard/analytics"}
          isCollapsed={isCollapsed}
        />
      </div>
      <footer className="border-t border-border py-4 mt-auto">
        <div className="px-4">
          <LogOutButton />
          <Separator className="my-2" />

          <ThemeSwapper />
          <Separator className="my-2" />
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
          >
            <ExternalLink size={16} />
            <span className={isCollapsed ? "sr-only" : ""}>Retourner sur le site</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
