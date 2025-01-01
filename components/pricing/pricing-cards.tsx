"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { UserSubscriptionPlan } from "@/types";
import { useRouter } from "next/navigation";

import { SubscriptionPlan } from "@/types/index";
import { pricingData } from "@/config/subscriptions";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BillingFormButton } from "@/components/forms/billing-form-button";
import { ModalContext } from "@/components/modals/providers";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
}

export function PricingCards({ userId, subscriptionPlan }: PricingCardsProps) {
  const isYearlyDefault =
    !subscriptionPlan?.stripeCustomerId || subscriptionPlan.interval === "year"
      ? true
      : false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);
  const { setShowSignInModal } = useContext(ModalContext);
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<string>('');

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  const handleSubscribe = (planId: string, planTitle: string) => {
    console.log(`Clicked on ${planTitle} plan with ID: ${planId}`);
    setDebugInfo(`Last clicked: ${planTitle} plan`);
    // Your existing subscription logic here
    router.push(`/checkout?plan=${planId}`);
  };

  const PricingCard = React.memo(({ offer }: { offer: SubscriptionPlan }) => {
    return (
      <div
        className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
        key={offer.title}
      >
        <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight text-gray-900">
              {offer.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2">{offer.description}</p>
            <p className="mt-4">
              <span className="text-4xl font-bold text-gray-900">
                ${isYearly ? offer.prices.yearly / 12 : offer.prices.monthly}
              </span>
              <span className="text-sm font-medium text-gray-500">/month</span>
            </p>
            <ul className="mt-4 space-y-2">
              {offer.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          {userId && subscriptionPlan ? (
            offer.title === "Starter" ? (
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    rounded: "full",
                  }),
                  "w-full mt-6",
                )}
              >
                Go to dashboard
              </Link>
            ) : (
              <BillingFormButton
                year={isYearly}
                offer={offer}
                subscriptionPlan={subscriptionPlan}
              />
            )
          ) : (
            <Button
              className="mt-6 w-full"
              onClick={() => handleSubscribe(isYearly ? offer.stripeIds.yearly : offer.stripeIds.monthly, offer.title)}
            >
              Subscribe to {offer.title}
            </Button>
          )}
        </div>
      </div>
    );
  });

  return (
    <MaxWidthWrapper>
      <section className="flex flex-col items-center text-center">
        <HeaderSection label="Pricing" title="Start at full speed !" />

        <div className="mb-4 mt-10 flex items-center gap-5">
          <ToggleGroup
            type="single"
            size="sm"
            defaultValue={isYearly ? "yearly" : "monthly"}
            onValueChange={toggleBilling}
            aria-label="toggle-year"
            className="h-9 overflow-hidden rounded-full border bg-background p-1 *:h-7 *:text-muted-foreground"
          >
            <ToggleGroupItem
              value="yearly"
              className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
              aria-label="Toggle yearly billing"
            >
              Yearly (-20%)
            </ToggleGroupItem>
            <ToggleGroupItem
              value="monthly"
              className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
              aria-label="Toggle monthly billing"
            >
              Monthly
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricingData.map((offer) => (
            <PricingCard offer={offer} key={offer.title} />
          ))}
        </div>

        <p className="mt-3 text-balance text-center text-base text-muted-foreground">
          Email{" "}
          <a
            className="font-medium text-primary hover:underline"
            href="mailto:support@saas-starter.com"
          >
            support@saas-starter.com
          </a>{" "}
          for to contact our support team.
          <br />
          <strong>
            You can test the subscriptions and won&apos;t be charged.
          </strong>
        </p>
      </section>
      <div className="mt-4 text-sm text-gray-500" aria-hidden="true">
        Debug: {debugInfo}
      </div>
    </MaxWidthWrapper>
  );
}
