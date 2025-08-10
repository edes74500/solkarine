"use client";

import { useLogOutMutation } from "@/redux/api/auth.ApiSlice";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogOutButton({ className }: { className?: string }) {
  const [logOut, { isLoading }] = useLogOutMutation();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logOut().unwrap();
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={isLoading}
      className={cn("flex items-center gap-2", className)}
    >
      <LogOut className="h-4 w-4" />
      <span>Déconnexion</span>
    </Button>
  );
}
