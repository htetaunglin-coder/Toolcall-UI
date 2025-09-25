import { Button } from "@mijn-ui/react"

import { ArrowUpRight, Book } from "lucide-react"
import { Footer } from "./components/layout/footer"
import { Navbar } from "./components/layout/navbar"
import Link from "next/link"

const HomePage = () => {
  return (
    <div className="flex h-screen flex-col items-center">
      <Navbar />

      <main className="relative flex h-full items-center justify-center overflow-hidden px-6">
        <div className="relative z-10 max-w-screen-lg text-left md:text-center">
          <h1 className="mt-6 text-4xl font-bold tracking-tighter text-neutral-900 dark:text-neutral-200 sm:text-5xl md:text-6xl md:leading-[1.2] lg:text-7xl">
            Reusable UI Components
            <br />
            <span className="text-neutral-700 dark:text-neutral-400">for AI Responses</span>
          </h1>
          <p className="mt-6 max-w-4xl text-secondary-foreground md:text-lg">
            <span className="font-bold">ToolcallUI</span> helps you build AI interfaces faster with ready-to-use charts,
            layouts, and tool-call components. Everything you need for responsive, customizable apps with React and
            Next.js.
          </p>
          <div className="mt-6 flex items-center justify-start gap-4 md:justify-center">
            <Button size="lg" className="rounded-full text-base" variant="primary" asChild>
              <Link href={"/docs"}>
                Get Started <ArrowUpRight className="size-5" />
              </Link>
            </Button>
            <Button size="lg" className="rounded-full text-base shadow-none" asChild>
              <Link href={"/docs"}>
                <Book className="mr-1 size-5" /> Docs
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
