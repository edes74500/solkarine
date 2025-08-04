import DashboardNavbar from "@/app/admin/dashboard/composant/DashboardNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mx-auto">
      <DashboardNavbar />
      <div className="flex-1 py-10  w-full mx-auto overflow-y-auto h-[100vh] min-h-[100vh] max-h-[100vh]">
        {children}
      </div>
    </div>
  );
}
