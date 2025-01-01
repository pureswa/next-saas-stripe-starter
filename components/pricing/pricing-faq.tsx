import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HeaderSection } from "../shared/header-section";
import { pricingData } from "@/config/subscriptions";

function generatePricingFaqData() {
  const freePlan = pricingData.find(plan => plan.title === "Starter");
  const proPlan = pricingData.find(plan => plan.title === "Pro");
  const businessPlan = pricingData.find(plan => plan.title === "Business");

  return [
    {
    id: "item-1",
    question: "What is the cost of the free plan?",
      answer: `Our ${freePlan?.title} plan is completely free, with no monthly or annual charges. It's a great way to get started and explore our basic features.`,
  },
  {
    id: "item-2",
      question: `How much does the ${proPlan?.title} Monthly plan cost?`,
      answer: `The ${proPlan?.title} Monthly plan is priced at $${proPlan?.prices.monthly} per month. It provides access to our core features and is billed on a monthly basis.`,
  },
  {
    id: "item-3",
      question: `What is the price of the ${businessPlan?.title} Monthly plan?`,
      answer: `The ${businessPlan?.title} Monthly plan is available for $${businessPlan?.prices.monthly} per month. It offers advanced features and is billed on a monthly basis for added flexibility.`,
  },
  {
    id: "item-4",
    question: "Do you offer any annual subscription plans?",
      answer: `Yes, we offer annual subscription plans for even more savings. The ${proPlan?.title} Annual plan is $${proPlan?.prices.yearly} per year, and the ${businessPlan?.title} Annual plan is $${businessPlan?.prices.yearly} per year.`,
  },
  {
    id: "item-5",
    question: "Is there a trial period for the paid plans?",
      answer: `We offer a 14-day free trial for both the ${proPlan?.title} Monthly and ${proPlan?.title} Annual plans. It's a great way to experience all the features before committing to a paid subscription.`,
  },
];
}

export function PricingFaq() {
  const pricingFaqData = generatePricingFaqData();

  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our comprehensive FAQ to find quick answers to common
          inquiries. If you need further assistance, don't hesitate to
          contact us for personalized help."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
