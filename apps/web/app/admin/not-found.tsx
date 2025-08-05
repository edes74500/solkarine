"use client";

export default function NotFound() {
  return (
    <div className="dashboard-section flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-3xl font-bold mb-4">404 – Page introuvable</h1>
      <p className="text-muted-foreground">Désolé, la page que vous cherchez n'existe pas...</p>
    </div>
  );
}
