import { constructMetadata } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { JobListing } from "@/components/careers/job-listing";

export const metadata = constructMetadata({
  title: "Careers – SaaS Starter",
  description: "Join our team and build the future of SaaS.",
});

// Updated openPositions array with the new job listings
const openPositions = [
  {
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "We're looking for a Backend Developer with 2 years of experience to join our engineering team. The ideal candidate will have strong skills in server-side programming, database management, and API development.",
    experience: "2 years"
  },
  {
    title: "Data Scientist",
    department: "Data Science",
    location: "Remote",
    type: "Full-time",
    description: "We're seeking an experienced Data Scientist with 5+ years of experience to join our data team. The ideal candidate will have expertise in machine learning, statistical analysis, and big data technologies.",
    experience: "5+ years"
  },
  // You can keep or remove the existing Data Scientist position if you want
];

export default function CareersPage() {
  return (
    <MaxWidthWrapper className="py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Careers</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Join our team and help us build the future of SaaS.
      </p>
      
      <h2 className="mt-12 text-2xl font-semibold">Open Positions</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {openPositions.map((job, index) => (
        <JobListing
            key={index}
            {...job}
        />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
