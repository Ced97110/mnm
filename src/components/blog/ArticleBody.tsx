import { Info, Lightbulb, AlertTriangle } from "lucide-react";

interface Section {
  heading: string;
  content: string;
  subSections?: Array<{ heading: string; content: string }>;
  list?: string[];
  callout?: { type: "tip" | "important" | "warning"; content: string };
}

interface ArticleBodyProps {
  sections: Section[];
}

const calloutConfig = {
  tip: {
    icon: Lightbulb,
    bgClass: "bg-gold/5 border-gold/20",
    iconClass: "text-gold",
    label: "Tip",
  },
  important: {
    icon: Info,
    bgClass: "bg-blue-50 border-blue-200",
    iconClass: "text-blue-600",
    label: "Important",
  },
  warning: {
    icon: AlertTriangle,
    bgClass: "bg-amber-50 border-amber-200",
    iconClass: "text-amber-600",
    label: "Warning",
  },
};

export function ArticleBody({ sections }: ArticleBodyProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {sections.map((section, i) => (
        <div key={i} className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
            {section.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {section.content}
          </p>

          {section.subSections?.map((sub, j) => (
            <div key={j} className="mb-4">
              <h3 className="text-xl font-semibold mt-6 mb-3">
                {sub.heading}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {sub.content}
              </p>
            </div>
          ))}

          {section.list && (
            <ul className="space-y-2 my-4">
              {section.list.map((item, k) => (
                <li
                  key={k}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <span className="text-gold mt-1.5 text-xs">&#9679;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {section.callout && (
            <Callout
              type={section.callout.type}
              content={section.callout.content}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Callout({
  type,
  content,
}: {
  type: "tip" | "important" | "warning";
  content: string;
}) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`rounded-xl border p-4 my-6 ${config.bgClass}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.iconClass}`} />
        <div>
          <span className="font-semibold text-sm">{config.label}: </span>
          <span className="text-sm text-muted-foreground">{content}</span>
        </div>
      </div>
    </div>
  );
}
