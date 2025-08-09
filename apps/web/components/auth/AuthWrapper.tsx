"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { selectCurrentAccessToken } from "@/redux/slices/auth.slice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const accessToken = useSelector(selectCurrentAccessToken);
  console.log(accessToken);

  if (!accessToken) {
    return <LoginForm />;
  }

  return <div>{children}</div>;
}
