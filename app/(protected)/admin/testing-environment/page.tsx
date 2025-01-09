import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { TestingEnvironment } from "@/components/admin/testing-environment";

export const metadata = constructMetadata({
  title: "Testing Environment – SaaS Starter",
  description: "Administer tests for job candidates.",
});

export default async function TestingEnvironmentPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <MaxWidthWrapper>
      <h1 className="text-3xl font-bold mb-6">Candidate Testing Environment</h1>
      <TestingEnvironment />
    </MaxWidthWrapper>
  );
}
