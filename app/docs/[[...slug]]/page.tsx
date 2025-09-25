import { source } from "@/lib/source"
import { File, Files, Folder } from "fumadocs-ui/components/files"
import { Step, Steps } from "fumadocs-ui/components/steps"
import { Tab, Tabs } from "fumadocs-ui/components/tabs"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page"
import { notFound } from "next/navigation"

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) notFound()

  const MDX = page.data.body

  return (
    <>
      <DocsPage toc={page.data.toc} full={page.data.full} lastUpdate={page.data.lastModified}>
        <div className="flex w-full flex-col items-baseline justify-between gap-3 sm:flex-row">
          <DocsTitle className="md:text-4xl md:font-extrabold">{page.data.title}</DocsTitle>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            {/*

          I think providing less option would result in helping user make better decisions.
          So commenting out the docs link for now.
          If you think this is a bad idea, please let me know.

           {page.data.docs && (
            <Link
              target="_blank"
              className="flex items-center gap-1 text-sm text-foreground/80 underline hover:text-primary"
              href={page.data.docs}>
              <ExternalLink />
              Docs
            </Link>
          )} 
           
          */}
          </div>
        </div>
        <DocsDescription className="mb-0 text-secondary-foreground">{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
              Steps,
              Step,
              Tabs,
              Tab,
              File,
              Files,
              Folder,
            }}
          />
        </DocsBody>
      </DocsPage>
    </>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
