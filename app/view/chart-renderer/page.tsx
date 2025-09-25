"use client"

import { ChartRenderer } from "@/components/chart/chart-renderer"
import { AIConversation, AIConversationContent, AIConversationScrollButton } from "@/components/ui/conversation"
import { Button } from "@mijn-ui/react"
import { ArrowUp } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { MockChartProps, mockCharts } from "./mock-data"

type ChartItem = {
  id: string
  chart: MockChartProps
  isLoading: boolean
  timestamp: number
}

const REVEAL_DELAY = 1000 // Time between chart reveals
const LOADING_DURATION = 1500 // How long each chart shows loading state

const ChartsShowcase: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true)

  return (
    <div className="w-full">
      <AIConversation className="relative h-screen w-full overflow-hidden">
        <AIConversationContent className="p-0 md:p-4" id="top">
          {showIntro ? (
            <IntroOverlay onStart={() => setShowIntro(false)} />
          ) : (
            <div className="flex size-full justify-center py-28">
              <div className="w-full max-w-screen-sm">
                <Charts />
              </div>
            </div>
          )}
        </AIConversationContent>
        <AIConversationScrollButton className="absolute" />
      </AIConversation>
    </div>
  )
}

const IntroOverlay: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background">
      <Button size="lg" onClick={onStart} variant="ghost" className="gap-2 bg-secondary text-base">
        Show Preview
      </Button>
    </div>
  )
}

const Charts: React.FC = () => {
  const [chartItems, setChartItems] = useState<ChartItem[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const currentIndexRef = useRef(0)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  // Function to add a new chart item
  const addNextChart = () => {
    const index = currentIndexRef.current
    if (index >= mockCharts.length) {
      setIsGenerating(false)
      return
    }

    const chart = mockCharts[index]
    const newItem: ChartItem = {
      id: `chart-${index}-${Date.now()}`,
      chart,
      isLoading: true,
      timestamp: Date.now(),
    }

    setChartItems((prev) => [...prev, newItem])

    // After loading duration, mark as ready
    const loadingTimeout = setTimeout(() => {
      setChartItems((prev) => prev.map((item) => (item.id === newItem.id ? { ...item, isLoading: false } : item)))
    }, LOADING_DURATION)
    timeoutRefs.current.push(loadingTimeout)

    // Schedule next chart reveal
    const nextChartTimeout = setTimeout(() => {
      currentIndexRef.current += 1
      addNextChart()
    }, REVEAL_DELAY)
    timeoutRefs.current.push(nextChartTimeout)
  }

  useEffect(() => {
    setChartItems([])
    setIsGenerating(true)
    currentIndexRef.current = 0

    timeoutRefs.current.forEach((t) => clearTimeout(t))
    timeoutRefs.current = []

    const initialTimeout = setTimeout(() => {
      addNextChart()
    }, 500)

    timeoutRefs.current.push(initialTimeout)

    return () => {
      timeoutRefs.current.forEach((t) => clearTimeout(t))
      timeoutRefs.current = []
    }
  }, [])

  const scrollToTop = () => {
    const container = document.querySelector("#top")
    if (container) {
      container.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <p className="fixed right-6 top-6 z-10 text-success-emphasis">
        {isGenerating
          ? `Generating charts... (${chartItems.length}/${mockCharts.length})`
          : `Analysis complete - ${chartItems.length} charts generated`}
      </p>

      {/* Chart Items */}
      <div className="flex flex-col gap-12">
        {chartItems.map((item, idx) => (
          <div key={item.id} id={`chart-${idx}`} className="duration-500 animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{item.chart.name}</h3>
            </div>

            {item.isLoading ? (
              <div className="relative flex h-[21rem] w-full flex-col rounded-lg border p-6">
                <div className="flex shrink-0 items-center justify-between">
                  <div className="h-4 w-48 animate-pulse rounded bg-muted/70" />
                  <div className="h-4 w-24 animate-pulse rounded bg-muted/50" />
                </div>
                <div className="relative my-4 h-full flex-1 animate-pulse overflow-hidden rounded-md bg-muted/80">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
                <div className="flex shrink-0 items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="size-1.5 animate-pulse rounded-full bg-current text-foreground" />
                  <span>Analyzing data...</span>
                </div>
              </div>
            ) : (
              <div className="duration-300 animate-in fade-in">
                <ChartRenderer {...item.chart} />
              </div>
            )}
          </div>
        ))}

        {!isGenerating && chartItems.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <p className="text-base text-success-emphasis">Analysis complete</p>
            <Button variant="ghost" onClick={scrollToTop} className="gap-2">
              Scroll To Top <ArrowUp />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChartsShowcase
