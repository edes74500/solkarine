import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const revalidateFetch = async (fetchName: string) => {
  const NEXT_URL = process.env.FRONTEND_WEB_URL || "https://solkarine.jdapp.dev";
  const SECRET = process.env.NEXT_REVALIDATION_SECRET;

  if (!SECRET) {
    console.error("NEXT_REVALIDATION_SECRET is not set");
    return;
  }

  console.log("NEXT_URL", NEXT_URL);
  console.log("SECRET", SECRET);
  console.log("fetchName", fetchName);

  const URL = `${NEXT_URL}/api/revalidate-fetch?secret=${SECRET}`;

  console.log("URL", URL);
  try {
    await axios.post(URL, { fetchName });
    console.log(`Revalidation du tag: ${fetchName}`);
  } catch (error) {
    console.error(error);
  }
};
