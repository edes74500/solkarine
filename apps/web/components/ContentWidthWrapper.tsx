"use client";

import { usePathname } from "next/navigation";

export default function ContentWidthWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.includes("admin");

  if (isAdminPage) {
    return <div className="max-w-[1080px] w-full mx-auto">{children}</div>;
  }

  return <div className="max-w-[1080px] w-full mx-auto py-5">{children}</div>;
}
