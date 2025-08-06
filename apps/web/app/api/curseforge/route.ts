// app/api/curseforge/route.ts
import { CurseForgeApiResponseSchema } from "@repo/types/dist";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    console.log(query);
    const key = process.env.CURSEFORGE_API_KEY;

    if (!key) {
      console.error("Clé API CurseForge manquante");
      return NextResponse.json({ error: "Configuration serveur incorrecte" }, { status: 500 });
    }

    if (!query || query.length < 3) {
      return NextResponse.json({ data: [], pagination: { index: 0, pageSize: 0, resultCount: 0, totalCount: 0 } });
    }

    const res = await fetch(
      `https://api.curseforge.com/v1/mods/search?gameId=1&searchFilter=${encodeURIComponent(query)}&pageSize=15&class=addons&gameVersionTypeId=517&sortField=2&sortOrder=1`,
      {
        headers: {
          "x-api-key": key,
          Accept: "application/json",
        },
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Erreur CurseForge: ${res.status} - ${errorText}`);
      return NextResponse.json({ error: "Erreur lors de la communication avec CurseForge" }, { status: res.status });
    }

    const rawData = await res.json();

    // Validation des données avec le schéma
    const parsedData = CurseForgeApiResponseSchema.parse(rawData);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("Erreur inattendue:", error);
    return NextResponse.json({ error: "Une erreur inattendue s'est produite" }, { status: 500 });
  }
}
