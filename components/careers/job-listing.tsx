import Link from "next/link";
import { Button } from "@/components/ui/button";

interface JobListingProps {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  experience: string;
}

export function JobListing({ title, department, location, type, description, experience }: JobListingProps) {
  const slugifiedTitle = title.toLowerCase().replace(/ /g, '-');

  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">{department}</span>
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">{location}</span>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">{type}</span>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">{experience}</span>
      </div>
      <p className="mt-4 text-muted-foreground">{description}</p>
      <Button className="mt-4" asChild>
        <Link href={`/careers/apply?position=${slugifiedTitle}`}>Apply Now</Link>
      </Button>
    </div>
  );
}
