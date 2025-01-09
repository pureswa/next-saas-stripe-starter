import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface JobListingProps {
  title: string;
  id: string;
  description?: string;
  location?: string;
}

export function JobListing({ title, id, description, location }: JobListingProps) {
  return (
    <Card className="group transition-all duration-300 hover:shadow-lg">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 transition-opacity group-hover:opacity-100" />
        <CardTitle className="relative z-10 transition-colors group-hover:text-white">{title}</CardTitle>
        {location && <CardDescription className="relative z-10 transition-colors group-hover:text-white/90">{location}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p>{description || "Join our team and make a difference in the world of SaaS."}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/careers/apply/${id}`} passHref>
          <Button className="w-full">Apply Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
