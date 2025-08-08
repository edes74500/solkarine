import { PERMISSION_AUTH } from "@repo/constants";

function flattenPermissions(obj: any): string[] {
  return Object.values(obj).flatMap((v) => (typeof v === "string" ? [v] : flattenPermissions(v)));
}
export const CATALOG = Array.from(new Set(flattenPermissions(PERMISSION_AUTH))).sort();
