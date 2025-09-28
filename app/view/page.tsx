"use client"

import { AIConversation, AIConversationContent, AIConversationScrollButton } from "@/components/ui/conversation"
import { Button } from "@mijn-ui/react"
import { ArrowUp } from "lucide-react"
import React, { useEffect, useRef, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { toolRegistry, type ToolName } from "@/components/tools/_registry"
import { data } from "./mock-data"
import StatusView from "@/components/tools/status-view"

type ToolItem = {
  id: string
  toolName: ToolName
  toolData: any
  isLoading: boolean
  timestamp: number
}

const REVEAL_DELAY = 1000
const LOADING_DURATION = 1500

const ViewPage: React.FC = () => {
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
                <Suspense fallback={<div>Loading...</div>}>
                  <Tools />
                </Suspense>
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

const Tools: React.FC = () => {
  const searchParams = useSearchParams()
  const [toolItems, setToolItems] = useState<ToolItem[]>([])
  const [isGenerating, setIsGenerating] = useState(true)
  const [selectedTools, setSelectedTools] = useState<ToolName[]>([])
  const currentIndexRef = useRef(0)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  // Parse search params to determine which tools to show
  useEffect(() => {
    const toolsParam = searchParams.get("tools")

    let toolsToShow: ToolName[] = []

    if (toolsParam) {
      // Parse comma-separated tool names
      const requestedTools = toolsParam.split(",").map((t) => t.trim()) as ToolName[]
      toolsToShow = requestedTools.filter((tool) => tool in toolRegistry)
    } else {
      // Default to chart_view if no params
      toolsToShow = ["chart_view"]
    }

    setSelectedTools(toolsToShow)
  }, [searchParams])

  // Get all items for selected tool types
  const getAllToolItems = (): ToolItem[] => {
    const items: ToolItem[] = []

    selectedTools.forEach((toolName) => {
      const toolData = data[toolName]

      if (Array.isArray(toolData)) {
        // If it's an array, create an item for each element
        toolData.forEach((dataItem, index) => {
          items.push({
            id: `tool-${toolName}-${index}-${Date.now()}`,
            toolName,
            toolData: dataItem,
            isLoading: true,
            timestamp: Date.now(),
          })
        })
      } else {
        // If it's a single object, create one item
        items.push({
          id: `tool-${toolName}-0-${Date.now()}`,
          toolName,
          toolData: toolData,
          isLoading: true,
          timestamp: Date.now(),
        })
      }
    })

    return items
  }

  // Function to add a new tool item
  const addNextTool = () => {
    const allItems = getAllToolItems()
    const index = currentIndexRef.current

    if (index >= allItems.length) {
      setIsGenerating(false)
      return
    }

    const newItem = allItems[index]

    setToolItems((prev) => [...prev, newItem])

    // After loading duration, mark as ready
    const loadingTimeout = setTimeout(() => {
      setToolItems((prev) => prev.map((item) => (item.id === newItem.id ? { ...item, isLoading: false } : item)))
    }, LOADING_DURATION)
    timeoutRefs.current.push(loadingTimeout)

    // Schedule next tool reveal
    const nextToolTimeout = setTimeout(() => {
      currentIndexRef.current += 1
      addNextTool()
    }, REVEAL_DELAY)
    timeoutRefs.current.push(nextToolTimeout)
  }

  useEffect(() => {
    if (selectedTools.length === 0) return

    setToolItems([])
    setIsGenerating(true)
    currentIndexRef.current = 0

    timeoutRefs.current.forEach((t) => clearTimeout(t))
    timeoutRefs.current = []

    const initialTimeout = setTimeout(() => {
      addNextTool()
    }, 500)

    timeoutRefs.current.push(initialTimeout)

    return () => {
      timeoutRefs.current.forEach((t) => clearTimeout(t))
      timeoutRefs.current = []
    }
  }, [selectedTools])

  const scrollToTop = () => {
    const container = document.querySelector("#top")
    if (container) {
      container.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (selectedTools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <h2 className="text-xl font-semibold">No Valid Tools Found</h2>
        <p className="text-muted-foreground">Use URL params like: ?tools=chart_view,image_view</p>
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Available tools:</p>
          <ul className="mt-2 list-disc pl-6">
            {Object.keys(toolRegistry).map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <p className="fixed right-6 top-6 z-10 text-success-emphasis">
        {isGenerating
          ? `Generating tools... (${toolItems.length}/${getAllToolItems().length})`
          : `Analysis complete - ${toolItems.length} tools generated`}
      </p>

      {/* Tool Items */}
      <div className="flex flex-col gap-12">
        {toolItems.map((item, idx) => (
          <div key={item.id} id={`tool-${idx}`} className="duration-500 animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold capitalize">{item.toolData?.name}</h3>
            </div>

            {item.isLoading ? (
              <ToolLoadingSkeleton toolName={item.toolName} />
            ) : (
              <div className="duration-300 animate-in fade-in">
                <ToolRenderer toolName={item.toolName} data={item.toolData} />
              </div>
            )}
          </div>
        ))}

        {!isGenerating && toolItems.length > 0 && (
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

const ToolLoadingSkeleton: React.FC<{ toolName: ToolName }> = ({ toolName }) => {
  const loadingConfig = toolRegistry[toolName].loadingMessages

  return <StatusView status="in_progress" title={loadingConfig.title} description={loadingConfig.description} />
}

const ToolRenderer: React.FC<{ toolName: ToolName; data: any }> = ({ toolName, data }) => {
  const toolConfig = toolRegistry[toolName]
  const Component = toolConfig.component

  return (
    <Suspense fallback={<ToolLoadingSkeleton toolName={toolName} />}>
      <Component {...data} />
    </Suspense>
  )
}

export default ViewPage
