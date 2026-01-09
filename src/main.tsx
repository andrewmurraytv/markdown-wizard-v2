
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found");
}

const root = ReactDOM.createRoot(rootEl);

function BootScreen({ message }: { message: string }) {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6">
      <section className="max-w-xl w-full rounded-lg border bg-background p-6 text-foreground">
        <h1 className="text-xl font-semibold">Loading…</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      </section>
    </main>
  );
}

function BootError({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6">
      <section className="max-w-xl w-full rounded-lg border bg-background p-6 text-foreground">
        <h1 className="text-xl font-semibold">App failed to start</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A JavaScript module crashed before React could render.
        </p>
        <pre className="mt-4 whitespace-pre-wrap rounded-md bg-muted p-3 text-xs">
          {message}
        </pre>
      </section>
    </main>
  );
}

root.render(
  <React.StrictMode>
    <BootScreen message="Initializing application…" />
  </React.StrictMode>
);

(async () => {
  try {
    const mod = await import("./App");
    const App = mod.default;

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    // If App (or any of its imports) throws during module evaluation, we still show a UI.
    console.error("Boot error:", err);
    root.render(
      <React.StrictMode>
        <BootError error={err} />
      </React.StrictMode>
    );
  }
})();

