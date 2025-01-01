import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import EmployeeLoginForm from "@/components/forms/employee-login-form";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = constructMetadata({
  title: "Employee Login – SaaS Starter",
  description: "Login page for employees.",
});

export default function EmployeeLoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex flex-1 w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Employee Login
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the employee portal
          </p>
        </div>
        <EmployeeLoginForm />
      </div>
    </div>
      <SiteFooter />
    </div>
  );
}
