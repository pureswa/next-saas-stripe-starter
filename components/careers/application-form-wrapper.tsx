"use client";

import { useSearchParams } from "next/navigation";
import ApplicationForm from "@/components/careers/application-form";

export default function ApplicationFormWrapper() {
  const searchParams = useSearchParams();
  const position = searchParams.get("position") || "Unspecified Position";

  return <ApplicationForm position={position} />;
}
