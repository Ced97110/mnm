import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/lib/constants";

export function InlineCTA() {
  return (
    <div className="my-10 rounded-xl bg-navy p-6 md:p-8 text-center">
      <h3 className="text-xl font-bold text-white mb-2">
        Need a Notary Now?
      </h3>
      <p className="text-white/70 mb-6 text-sm">
        Same-day appointments available 7 days a week throughout the Bay Area.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button
          asChild
          className="bg-gold hover:bg-gold-light text-navy gap-2 font-semibold"
        >
          <a href={BUSINESS.phoneLink}>
            <Phone className="h-4 w-4" />
            Call {BUSINESS.phone}
          </a>
        </Button>
        <Button
          variant="outline"
          asChild
          className="border-white/20 text-white hover:bg-white/10 gap-2"
        >
          <a href="/booking">
            <Calendar className="h-4 w-4" />
            Book Online
          </a>
        </Button>
      </div>
    </div>
  );
}
