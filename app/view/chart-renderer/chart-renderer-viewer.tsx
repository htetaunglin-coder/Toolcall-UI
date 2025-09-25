"use client"

import { useIsMobile } from "@/app/hooks/use-screen-sizes"
import { Button } from "@mijn-ui/react"
import { ExternalLink, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const ChartRendererViewer = () => {
  const [iframeKey, setIframeKey] = useState(0)
  const isMobile = useIsMobile()

  const handleRefresh = () => setIframeKey((key: number) => key + 1)

  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="flex items-center justify-end gap-2"> 
        <Button asChild iconOnly title="Full screen">
          <Link href={"/view/chart-renderer"} target="_blank">
            <ExternalLink />
          </Link>
        </Button>
        <Button size="sm" className="gap-2" onClick={handleRefresh}>
          <RefreshCcw /> Refresh
        </Button>
      </div>
      <div className="w-full overflow-hidden rounded-md border p-4">
        <iframe
          key={iframeKey}
          src={`/view/chart-renderer`}
          height={isMobile ? 320 : 640}
          className="relative z-20 w-full bg-background"
        />
      </div>
    </div>
  )
}

export { ChartRendererViewer }
