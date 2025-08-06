import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import { DashboardWrapper } from "@/components/wrapper/DashboardWrapper";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardWrapper>
      <div className="flex flex-col md:flex-row gap-4 mx-auto">
        <DashboardNavbar />
        <div className="flex-1 py-10  w-full mx-auto overflow-y-auto grow">{children}</div>
      </div>
    </DashboardWrapper>
  );
}
