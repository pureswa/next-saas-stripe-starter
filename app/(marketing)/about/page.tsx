import React from 'react';
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <MaxWidthWrapper>
      <h1 className="text-4xl font-bold mb-6">About {siteConfig.name}</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p>{siteConfig.description}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-6">
          <li>Built with Next.js 14</li>
          <li>Database management with Prisma and Neon</li>
          <li>Authentication using Auth.js v5</li>
          <li>Email functionality with Resend and React Email</li>
          <li>UI components from Shadcn/ui</li>
          <li>Payment processing with Stripe integration</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p>Ready to build your next SaaS project? Check out our documentation to get started!</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
        <p>Follow us on Twitter for updates.</p>
        <p>Explore our code on GitHub.</p>
        <p>Need support? Contact us at {siteConfig.mailSupport}.</p>
      </section>
    </MaxWidthWrapper>
  );
}
