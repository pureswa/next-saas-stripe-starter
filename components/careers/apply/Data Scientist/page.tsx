import { constructMetadata } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { ApplicationForm } from "@/components/careers/application-form";

export const metadata = constructMetadata({
  title: "Apply for Position – SaaS Starter",
  description: "Apply for an open position at our company.",
});

export default function ApplyPage({ params }: { params: { position: string } }) {
  const position = params.position.replace(/-/g, ' ');

  return (
    <MaxWidthWrapper className="py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Apply for {position}</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Fill out the form below to apply for this position.
      </p>
      
      <ApplicationForm position={position} />
    </MaxWidthWrapper>
  );
}
