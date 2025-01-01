import { siteConfig } from "@/config/site";

export default function HelpNumber() {
  const helpNumber = siteConfig.helpNumber || "Not available";
  return (
    <section className="bg-muted p-4 text-center">
      <p className="text-sm">
        Need help? Call our support team at:{" "}
          {helpNumber !== "Not available" ? (
            <a
              href={`tel:${helpNumber}`}
              className="font-semibold text-primary hover:underline"
            >
              {helpNumber}
            </a>
          ) : (
            <span className="font-semibold text-primary">{helpNumber}</span>
          )}
        </p>
    </section>
  );
}
