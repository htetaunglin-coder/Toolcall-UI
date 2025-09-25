"use client"

import { RootProvider } from "fumadocs-ui/provider"
import { ReactNode } from "react"

const FumadocsRootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <RootProvider
      search={{
        options: {
          api: "/api/search",
        },
      }}>
      {children}
    </RootProvider>
  )
}

export default FumadocsRootProvider
