import { baseUrl, createMetadata } from "@/lib/metadata"
import { Geist_Mono } from "next/font/google"
import type { ReactNode } from "react"
import FumadocsRootProvider from "./components/providers/fumadocs-provider"
import "./css/global.css"

const inter = Geist_Mono({
  subsets: ["latin"],
})

export const metadata = createMetadata({
  title: {
    template: "%s | ToolCallUI",
    default: "ToolCallUI",
  },
  description:
    "ToolcallUI offers modular, copy-and-paste UI components for rendering AI tool calls like charts, tables, and product cards.",
  metadataBase: baseUrl,
})

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <FumadocsRootProvider>{children}</FumadocsRootProvider>
      </body>
    </html>
  )
}
