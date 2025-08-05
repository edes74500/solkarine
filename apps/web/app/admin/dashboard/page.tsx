import { StatisticDash } from "@/app/admin/dashboard/components/StatisticDash";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, LayoutDashboard, Package, Settings, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color?: string;
}

function DashboardCard({ title, description, href, icon, color = "bg-blue-500" }: DashboardCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer border-2 hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${color} text-white`}>{icon}</div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Dashboard() {
  const dashboardItems = [
    {
      title: "Tableau de bord",
      description: "Vue d'ensemble et statistiques principales",
      href: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      color: "bg-blue-500",
    },
    {
      title: "Donjons",
      description: "Gestion des donjons et de leurs configurations",
      href: "/admin/dashboard/dungeons",
      icon: <Shield size={20} />,
      color: "bg-green-500",
    },
    {
      title: "Personnages",
      description: "Administration des personnages et profils",
      href: "/admin/dashboard/characters",
      icon: <Users size={20} />,
      color: "bg-purple-500",
    },
    {
      title: "Addons",
      description: "Gestion des addons et extensions",
      href: "/admin/dashboard/addons",
      icon: <Package size={20} />,
      color: "bg-orange-500",
    },
    {
      title: "WeakAuras",
      description: "Configuration et gestion des WeakAuras",
      href: "/admin/dashboard/weak-auras",
      icon: <Zap size={20} />,
      color: "bg-yellow-500",
    },
    {
      title: "Utilisateurs",
      description: "Gestion des utilisateurs et permissions",
      href: "/admin/dashboard/users",
      icon: <Users size={20} />,
      color: "bg-red-500",
    },
    {
      title: "Aide",
      description: "Documentation et support utilisateur",
      href: "/admin/dashboard/help",
      icon: <HelpCircle size={20} />,
      color: "bg-indigo-500",
    },
    {
      title: "Changer de saison",
      description: "Configuration des saisons et transitions",
      href: "/admin/dashboard/change-season",
      icon: <Settings size={20} />,
      color: "bg-teal-500",
    },
  ];

  return (
    <section className="dashboard-section">
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Administration Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenue dans votre espace d'administration. Sélectionnez une section pour commencer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dashboardItems.map((item, index) => (
            <DashboardCard
              key={index}
              title={item.title}
              description={item.description}
              href={item.href}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>

        <div className="mt-12">
          <StatisticDash />
        </div>
      </div>
    </section>
  );
}
