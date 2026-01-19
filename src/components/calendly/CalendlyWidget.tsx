"use client";

import { InlineWidget } from "react-calendly";

const CALENDLY_URL = "https://calendly.com/mobile-notary-management";

interface CalendlyWidgetProps {
  /** Optional: Pre-fill user information */
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: Record<string, string>;
  };
  /** Optional: UTM parameters for tracking */
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
}

export function CalendlyWidget({ prefill, utm }: CalendlyWidgetProps) {
  return (
    <div className="calendly-widget-container">
      <InlineWidget
        url={CALENDLY_URL}
        prefill={prefill}
        utm={utm}
        styles={{
          height: "700px",
          width: "100%",
        }}
      />
    </div>
  );
}

export { CALENDLY_URL };
