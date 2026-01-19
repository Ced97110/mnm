import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-cream">
      <div className="text-center px-4">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-navy/10">
          <FileQuestion className="h-10 w-10 text-navy" />
        </div>
        <h1 className="text-4xl font-bold text-navy mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, this page couldn&apos;t be found. It might have
          been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-navy hover:bg-navy-light">
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/booking">Book Appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
