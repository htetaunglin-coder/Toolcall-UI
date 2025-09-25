import { DocsLayout } from "fumadocs-ui/layouts/docs"
import type { ReactNode } from "react"
import { baseOptions } from "@/app/layout.config"
import { source } from "@/lib/source"
import { Footer } from "../components/layout/footer"
import { TooltipProvider } from "../components/ui/tooltip"
import { Button } from "@mijn-ui/react"
import { Icons } from "../components/ui/icons"
import ThemeToggler from "../components/ui/theme-toggler"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsLayout
        tree={source.pageTree}
        sidebar={{
          enabled: true,
          footer: (
            <div className="flex items-center justify-between gap-4">
              <ThemeToggler />
              <Button variant="ghost">
                <Icons.github className="size-4" />
                Github
              </Button>
            </div>
          ),
          collapsible: false,
        }}
        containerProps={{
          // Hide the theme toggle and search component in the docs sidebar
          className: "[&_[data-theme-toggle]]:hidden ",
        }}
        {...baseOptions}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </DocsLayout>

      <Footer className="border-t" />
    </>
  )
}
