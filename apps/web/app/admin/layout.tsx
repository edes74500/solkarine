import AuthWrapper from "@/components/auth/AuthWrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
