import { constructMetadata } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { ApplicationForm } from "@/components/careers/application-form";

export const metadata = constructMetadata({
  title: "Apply for a Position – SaaS Starter",
  description: "Apply for an open position at our company.",
});

const jobs = [
  { title: "AI Research Scientist", id: "ai-research" },
  { title: "Machine Learning Engineer", id: "ml-engineer" },
  { title: "Data Scientist", id: "data-scientist" },
  // Add more job listings as needed
];
export default function ApplyPage({ params }: { params: { id: string } }) {
  const position = jobs.find(job => job.id === params.id)?.title || "Unknown Position";

  return (
    <MaxWidthWrapper>
      <h1 className="text-3xl font-bold mb-6">Apply for {position}</h1>
      <ApplicationForm jobId={params.id} position={position} />
    </MaxWidthWrapper>
  );
}
