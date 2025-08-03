"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BarChart3, ExternalLink, HelpCircle, LayoutDashboard, Menu, Settings, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive?: boolean;
  isCollapsed: boolean;
}

function NavItem({ icon, title, href, isActive, isCollapsed }: NavItemProps) {
  const buttonContent = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 px-3",
        isActive ? "bg-foreground text-background hover:bg-foreground/80 hover:text-background" : "hover:bg-muted/50",
        isCollapsed ? "h-12 px-3" : "h-10 px-3",
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
        "flex flex-col h-screen bg-card border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-row items-center justify-between p-4 border-b">
        {!isCollapsed && <h2 className="font-semibold flex flex-row items-center gap-2">ADMIN DASHBOARD</h2>}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="ml-auto">
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-2 px-2">
        <NavItem
          icon={<LayoutDashboard size={20} />}
          title="Tableau de bord"
          href="/dashboard"
          isActive={pathname === "/dashboard"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Users size={20} />}
          title="Utilisateurs"
          href="/dashboard/users"
          isActive={pathname === "/dashboard/users"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<BarChart3 size={20} />}
          title="Annonces"
          href="/dashboard/stats"
          isActive={pathname === "/dashboard/stats"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<Settings size={20} />}
          title="Profils"
          href="/dashboard/settings"
          isActive={pathname === "/dashboard/settings"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<BarChart3 size={20} />}
          title="Statistiques"
          href="/dashboard/stats"
          isActive={pathname === "/dashboard/stats"}
          isCollapsed={isCollapsed}
        />
        <NavItem
          icon={<HelpCircle size={20} />}
          title="Aide"
          href="/dashboard/help"
          isActive={pathname === "/dashboard/help"}
          isCollapsed={isCollapsed}
        />
      </div>
      <footer className="border-t border-border py-4 mt-auto">
        <div className="px-4">
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
