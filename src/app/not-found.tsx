import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="bg-secondary text-muted-foreground mb-4 flex h-14 w-14 items-center justify-center rounded-full">
        <FileQuestion className="h-8 w-8" />
      </div>
      <span className="text-primary text-xs font-semibold tracking-widest uppercase">
        404 Error
      </span>
      <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Page Not Found
      </h1>
      <p className="text-muted-foreground mt-2 max-w-md text-sm">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
