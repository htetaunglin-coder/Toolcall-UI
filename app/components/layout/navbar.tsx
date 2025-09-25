"use client"

import ThemeToggler from "@/app/components/ui/theme-toggler"
import {
  Button,
  buttonStyles,
  cn,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
} from "@mijn-ui/react"
import { SidebarTrigger } from "fumadocs-core/sidebar"
import { useSearchContext, useSidebar } from "fumadocs-ui/provider"
import { ChevronDown, ExternalLink, Menu, Search, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import ClickAwayListener from "react-click-away-listener"
import { Icons } from "../ui/icons"

const PAGES = [
  {
    title: "Documentation",
    href: "/docs",
  },
]

const Navbar = ({ className }: { className?: string }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { open: isSidebarOpen } = useSidebar()
  const { setOpenSearch } = useSearchContext()

  const renderPages = PAGES.map((page) => (
    <Link key={page.title} className="text-sm text-secondary-foreground hover:text-foreground" href={page.href}>
      {page.title}
    </Link>
  ))

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-40 h-12 w-full flex-col items-center justify-center border-b border-b-border bg-background/10 backdrop-blur md:flex md:h-16",
        className,
      )}>
      <nav className="flex w-full max-w-screen-xl items-center justify-between px-5 py-2 xl:px-0">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="flex items-center gap-2 font-bold">
            ToolCallUI
          </Link>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <Button onClick={() => setOpenSearch(true)} className="gap-2">
            <Search size={16} className="text-secondary-foreground" />
            <span className="inline-block text-secondary-foreground">Search...</span>
            <div className="ml-4 inline-flex h-5 gap-1 rounded-full border px-2 py-px">
              <kbd className="text-xxs">Ctrl+</kbd>
              <kbd className="text-xxs">K</kbd>
            </div>
          </Button>

          {renderPages}
          <Link
            className="flex items-center gap-1 text-sm text-secondary-foreground hover:text-foreground"
            href={"https://github.com/htetaunglin-coder/Toolcall-UI"}
            target="_blank">
            <Icons.github className="mr-1" />
            Github
          </Link>
          <ThemeToggler />
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setOpenSearch(true)}
            className="inline-flex size-8 items-center justify-center text-secondary-foreground transition duration-200 hover:text-secondary-foreground">
            <Search />
          </button>

          <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
            <Collapsible open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <CollapsibleTrigger className="flex size-8 items-center justify-center text-secondary-foreground transition duration-200 hover:text-foreground">
                <ChevronDown className="text-lg" />
              </CollapsibleTrigger>
              <CollapsibleContent className="top-[calc(var(--navbar-height)] absolute inset-x-0 mt-2 overflow-hidden bg-background-alt text-sm transition-[height] data-[state=closed]:animate-collapsible-close data-[state=open]:animate-collapsible-open">
                <div className="relative flex w-full flex-col items-start justify-between space-y-2 px-4 py-2">
                  <div className="flex w-fit flex-col gap-2">{renderPages}</div>
                  <Separator />

                  <div className="flex w-full items-center justify-between">
                    <Link
                      className="inline-flex items-center gap-2 text-secondary-foreground hover:text-foreground"
                      target="_blank"
                      href={"https://github.com/htetaunglin-coder/Toolcall-UI"}>
                      Github <ExternalLink />
                    </Link>
                    <ThemeToggler />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </ClickAwayListener>

          <SidebarTrigger
            className={cn(
              buttonStyles({
                variant: "ghost",
                iconOnly: true,
                className: "-me-2 md:hidden",
              }).base(),
            )}>
            {isSidebarOpen ? <X /> : <Menu />}
          </SidebarTrigger>
        </div>
      </nav>
    </header>
  )
}

export { Navbar }
