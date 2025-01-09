import { constructMetadata } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { JobListing } from "@/components/careers/job-listing";
import { HeaderSection } from "@/components/shared/header-section";
import { EmployeeTestimonials } from "@/components/careers/employee-testimonials";
import { Button } from "@/components/ui/button";

export const metadata = constructMetadata({
  title: "Careers – SaaS Starter",
  description: "Join our team and build the future of SaaS.",
});

const jobs = [
  { 
    title: "AI Research Scientist", 
    id: "ai-research", 
    location: "Remote",
    description: "Join our cutting-edge AI research team and shape the future of machine learning."
  },
  { 
    title: "Machine Learning Engineer", 
    id: "ml-engineer", 
    location: "Hyderabad",
    description: "Develop and implement machine learning models for our innovative products."
  },
  { 
    title: "Data Scientist", 
    id: "data-scientist", 
    location: "Bengaluru",
    description: "Turn data into actionable insights to drive business decisions."
  },
  // Add more job listings as needed
];

export default function CareersPage() {
  return (
    <MaxWidthWrapper>
      <HeaderSection
        label="Careers"
        title="Join Our Team"
        // description="We're looking for talented individuals to help us build the future of SaaS."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobListing 
            key={job.id} 
            title={job.title} 
            id={job.id} 
            location={job.location}
            description={job.description}
          />
        ))}
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
        <p className="mb-8">Join a team of passionate innovators and make a real impact in the world of technology.</p>
        <Button size="lg">View All Positions</Button>
      </div>
      <EmployeeTestimonials />
    </MaxWidthWrapper>
  );
}
