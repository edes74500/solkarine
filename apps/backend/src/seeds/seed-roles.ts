import { Permission } from "@/models/auth/permission.model";
import { upsertRoleWithVersion } from "@/services/auth/role.service";
import { PERMISSION_AUTH } from "@repo/constants";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

type DeepValues<T> = T[keyof T] extends infer U ? (U extends string ? U : DeepValues<U>) : never;
type PermissionName = DeepValues<typeof PERMISSION_AUTH>;

/** ----- 2) Utils ----- */
function flattenPermissions(obj: any): string[] {
  return Object.values(obj).flatMap((v) => (typeof v === "string" ? [v] : flattenPermissions(v)));
}
const ALL_PERMS: PermissionName[] = flattenPermissions(PERMISSION_AUTH) as PermissionName[];

/** Helpers par ressource */
// const byResource = (r: string) => (p: string) => p.startsWith(`${r}:`);
// const byAction = (actions: string[]) => (p: string) => actions.includes(p.split(":")[1]);

/** Sélections utilitaires */
// const READ_ALL = ALL_PERMS.filter(byAction(["read"])) as PermissionName[];
// const CONTENT_RES = [
//   "weak_aura",
//   "strong_aura",
//   "addon",
//   "character",
//   "stream_schedule",
//   "addon_profile",
//   "dungeon",
//   "change_season",
//   "talent",
//   "tip",
// ];

/** ----- 4) Seed logic ----- */
export async function seedRoles() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/app";
  await mongoose.connect(uri);
  console.log(`Connected to ${uri}`);

  // Index des permissions par nom
  const perms = await Permission.find().select({ _id: 1 }).lean();
  const idx = new Map<string, string>();
  for (const p of perms) idx.set(p._id, p._id);

  const toIds = (names: PermissionName[]): string[] =>
    names.map((n) => {
      const id = idx.get(n);
      if (!id) throw new Error(`Permission manquante en DB: ${n}`);
      return id;
    });

  // --- Rôle: admin (toutes les permissions)
  const adminIds = toIds(ALL_PERMS);

  // --- Rôle: recruteur (READ partout + CREATE/UPDATE sur le contenu; pas USER, pas DELETE)
  //   const recReadAll = READ_ALL;
  //   const recCreateUpdateContent = CONTENT_RES.flatMap((r) =>
  //     ALL_PERMS.filter(byResource(r)).filter(byAction(["create", "update"])),
  //   ) as PermissionName[];
  //   const recFiltered = [...recReadAll, ...recCreateUpdateContent].filter(
  //     (p) => !p.startsWith("user:"),
  //   ) as PermissionName[];
  //   const recruteurIds = toIds(Array.from(new Set(recFiltered)));

  //   // --- Rôle: candidat (READ only)
  //   const candidatIds = toIds(READ_ALL);

  // Upsert + version++
  await upsertRoleWithVersion("admin", adminIds);
  //   await upsertRoleWithVersion("recruteur", recruteurIds);
  //   await upsertRoleWithVersion("candidat", candidatIds);

  await mongoose.disconnect();
  console.log("Done.");
}

seedRoles().catch(async (err) => {
  console.error(err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
