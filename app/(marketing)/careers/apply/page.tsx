import { Metadata } from 'next';
import { constructMetadata } from "@/lib/utils";
import ApplicationFormWrapper from "@/components/careers/application-form-wrapper";

export const metadata: Metadata = constructMetadata({
  title: "Apply for a Position – SaaS Starter",
  description: "Apply for an open position at our company.",
});

export default function ApplyPage() {
  return <ApplicationFormWrapper />;
}
