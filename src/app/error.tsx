"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log error to an error reporting service like Sentry or Datadog in production
    console.error("Unhandled client error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="bg-destructive/10 text-destructive mb-4 flex h-14 w-14 items-center justify-center rounded-full">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        Something went wrong
      </h2>
      <p className="text-muted-foreground mt-2 max-w-md text-sm">
        An unexpected error occurred while rendering this page. Our team has
        been notified.
      </p>
      {error.digest && (
        <p className="text-muted-foreground mt-1 font-mono text-xs">
          Error Digest: {error.digest}
        </p>
      )}
      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline" onClick={() => router.push("/")}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}
