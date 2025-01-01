import { notFound } from "next/navigation";
import { allDocs } from "contentlayer/generated";

import { Mdx } from "@/components/content/mdx-components";
import { DocsPageHeader } from "@/components/docs/page-header";
import { DocsPager } from "@/components/docs/pager";
import "@/styles/mdx.css";
import { Separator } from "@/components/ui/separator";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams(params: DocPageProps["params"]) {
  const slug = params?.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    null;
  }

  return doc;
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
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
  );
}
