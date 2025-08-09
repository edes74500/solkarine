import { getUserPermsService } from "@/services/auth/user.service";
import { ALL_PERMISSIONS } from "@repo/constants";

export function requirePerm(needed: (typeof ALL_PERMISSIONS)[number][]) {
  return async (req: any, res: any, next: any) => {
    const userId = req.auth?.userId; // depuis ton access token
    if (!userId) return res.status(401).end();

    const perms = await getUserPermsService(userId);
    if (needed.every((perm) => perms.has(perm))) return next();

    return res.status(403).json({ error: "forbidden", needed });
  };
}
