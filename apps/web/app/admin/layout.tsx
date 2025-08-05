import DashboardNavbar from "@/app/admin/dashboard/components/DashboardNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mx-auto">
      <DashboardNavbar />
      <div className="flex-1 py-10  w-full mx-auto overflow-y-auto grow">{children}</div>
    </div>
  );
}
