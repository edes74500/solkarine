// app/error.tsx
"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ padding: 40, textAlign: "center" }}>
          <h1>Oups ! Une erreur est survenue</h1>
          <p>{error.message}</p>
          <button onClick={reset} style={{ marginTop: 20 }}>
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
