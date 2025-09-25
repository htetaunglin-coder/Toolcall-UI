import { cn } from "@mijn-ui/react"

type FooterProps = {
  className?: string
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("flex w-full items-center justify-center py-4", className)}>
      <div className="flex w-full max-w-screen-lg flex-col items-center justify-center gap-2 px-5 py-2 sm:flex-row">
        <p className="text-xs text-secondary-foreground sm:text-sm">
          Created by{" "}
          <a
            href="https://github.com/htetaunglin-coder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#46427c] underline dark:text-[#8f8bb4]">
            Htet Aung Lin
          </a>{" "}
          at{" "}
          <a
            href="https://www.linkedin.com/company/picoinno"
            target="_blank"
            rel="noopener noreferrer"
            className="underline">
            Pico
          </a>
        </p>
      </div>
    </footer>
  )
}

export { Footer }
