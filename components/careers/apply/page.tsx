"use client";

import { useSearchParams } from "next/navigation";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import ApplicationForm from "@/components/careers/application-form";
export default function ApplyPage() {
  const searchParams = useSearchParams();
  const position = searchParams.get("position");

  return (
    <MaxWidthWrapper className="py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Apply for {position ? position.replace(/-/g, ' ') : 'Position'}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Fill out the form below to apply for this position.
      </p>
      <ApplicationForm position={position || ''} />
    </MaxWidthWrapper>
  );
}
