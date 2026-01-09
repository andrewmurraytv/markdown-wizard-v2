import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Keep this console.error so users can see the root cause in DevTools.
    console.error("App render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <main className="min-h-screen w-full flex items-center justify-center p-6">
            <section className="max-w-xl w-full rounded-lg border bg-background p-6 text-foreground">
              <h1 className="text-xl font-semibold">Something went wrong</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                The app failed to render. Please refresh the page.
              </p>
              {this.state.error?.message ? (
                <pre className="mt-4 whitespace-pre-wrap rounded-md bg-muted p-3 text-xs">
                  {this.state.error.message}
                </pre>
              ) : null}
            </section>
          </main>
        )
      );
    }

    return this.props.children;
  }
}
