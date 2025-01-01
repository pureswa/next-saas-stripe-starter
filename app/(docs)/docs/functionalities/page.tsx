import { Metadata } from "next"
import { allDocs } from "contentlayer/generated"

import { Mdx } from "@/components/content/mdx-components"
import { DocsPageHeader } from "@/components/docs/page-header"
import { DocsPager } from "@/components/docs/pager"

import "@/styles/mdx.css"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Functionalities",
  description: "Explore the core functionalities of Next SaaS Stripe Starter.",
}

export default async function FunctionalitiesPage() {
  const doc = allDocs.find((doc) => doc.slugAsParams === "functionalities")

  if (!doc) {
    return <div>Document not found</div>
  }

  return (
    <main className="relative py-6 lg:gap-10 lg:py-10">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <Separator className="my-4 md:my-6" />
        <Mdx code={doc.body.code} />
        <hr className="my-4" />
        <DocsPager doc={doc} />
      </div>
    </main>
  )
}
