"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { LoadingSpinner } from "@/components/spinners/LoadingSpinner";
import { useRefreshAccessTokenMutation } from "@/redux/api/auth.ApiSlice";
import { selectCurrentAccessToken } from "@/redux/slices/auth.slice";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const accessToken = useSelector(selectCurrentAccessToken);
  const [refreshAccessToken, { isLoading: isRefreshing, isError }] = useRefreshAccessTokenMutation();

  // ensure we try refresh only once per mount
  const triedRef = useRef(false);

  useEffect(() => {
    if (!accessToken && !triedRef.current) {
      triedRef.current = true;
      // fire & forget; component stays pure
      refreshAccessToken().catch(() => {});
    }
  }, [accessToken, refreshAccessToken]);

  // while checking/refreshing, show nothing or a loader
  if (!accessToken) {
    if (isRefreshing || !triedRef.current)
      return (
        <div className="flex h-screen w-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      );

    if (isError) return <LoginForm />;
    // no token after refresh finished -> show login
    return <LoginForm />;
  }

  return <div>{children}</div>;
}
