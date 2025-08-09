import { Role } from "@/models/auth/role.model";
import { User } from "@/models/auth/user.model";
import { hashPassword } from "@/utils/auth.utils";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function seedUser() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/app";
  await mongoose.connect(uri);
  console.log(`Connected to ${uri}`);

  const adminRole = await Role.findOne({ name: "admin" });
  console.log(adminRole?._id);

  if (!adminRole) {
    console.error("Admin role not found");
    return;
  }
  console.log("Admin role found");
  const hashedPassword = await hashPassword("1234");
  const existingUser = await User.findOne({ username: "admin" });

  if (existingUser) {
    await User.updateOne({ username: "admin" }, { $set: { password: hashedPassword, roleIds: [adminRole._id] } });
    return;
  }

  await User.create({ username: "admin", password: hashedPassword, roleIds: [adminRole._id] });

  console.log("User created successfully");
  await mongoose.disconnect();
}

seedUser().catch(async (err) => {
  console.error(err);
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
