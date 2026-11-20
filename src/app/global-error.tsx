"use client";

// Replaces the root layout when it crashes, so global CSS is NOT loaded here: keep styles inline.
export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          colorScheme: "light dark",
        }}
      >
        <title>Error</title>
        <div style={{ maxWidth: 420, padding: 24 }}>
          <h1 style={{ fontSize: 20, margin: "0 0 8px" }}>The app crashed</h1>
          <p style={{ margin: "0 0 16px", opacity: 0.7 }}>A critical error occurred. Try reloading.</p>
          <button onClick={() => retry()} style={{ padding: "8px 14px", borderRadius: 8, cursor: "pointer" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
