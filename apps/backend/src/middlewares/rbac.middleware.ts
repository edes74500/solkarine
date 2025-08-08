import { getUserPermsService } from "@/services/auth/user.service";

// usage: requirePerm("job.update.any")
export function requirePerm(needed: PermissionName) {
  return async (req: any, res: any, next: any) => {
    const userId = req.auth?.userId; // depuis ton access token
    if (!userId) return res.status(401).end();

    const perms = await getUserPermsService(userId);
    if (perms.has(needed)) return next();

    return res.status(403).json({ error: "forbidden", needed });
  };
}
