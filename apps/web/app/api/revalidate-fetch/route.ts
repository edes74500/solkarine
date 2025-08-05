// app/api/revalidate-fetch/route.ts
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  // Vérification du secret pour la sécurité
  if (secret !== process.env.REVALIDATION_SECRET) {
    console.error("Tentative d'accès avec un token invalide");
    return NextResponse.json({ revalidated: false, error: "Invalid token" }, { status: 401 });
  }

  // // Informations sur la route
  // console.log("⏭️⏭️------- INFORMATIONS DE REQUÊTE -------⏭️⏭️");
  // console.log("URL complète :", request.nextUrl.href);
  // console.log("Chemin :", request.nextUrl.pathname);
  // console.log("Méthode :", request.method);
  // console.log("Headers :", Object.fromEntries(request.headers.entries()));
  // console.log("Paramètres :", Object.fromEntries(request.nextUrl.searchParams.entries()));
  // console.log("⏭️⏭️--------------------------------------⏭️⏭️");

  try {
    const body = await request.json();
    const { fetchName }: { fetchName: string } = body;

    if (!fetchName) {
      return NextResponse.json({ revalidated: false, message: "Données invalides" }, { status: 400 });
    }

    revalidateTag(`${fetchName}`);
    console.log(`Revalidation du tag: ${fetchName}`);

    return NextResponse.json({ revalidated: true, message: "Revalidation effectuée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la revalidation:", error);
    return NextResponse.json({ revalidated: false, error: "Erreur lors de la revalidation" }, { status: 500 });
  }
}
