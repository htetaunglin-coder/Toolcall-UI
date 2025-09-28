import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import StatusView from "./status-view"
import { ToolName, toolRegistry } from "./_registry"

type ToolCall = {
  id: string
  name: string
  status: "created" | "in_progress" | "completed" | "error"
  arguments: Record<string, any> | null
}

export const ToolCallPreview = ({ tool }: { tool: ToolCall }) => {
  const toolName = tool.name as ToolName
  const registration = toolRegistry[toolName]

  if (!registration) {
    return <StatusView status="error" title={`Tool: "${tool.name}" doesn't exist.`} />
  }

  const { schema, component: Component, loadingMessages } = registration

  if (tool.status === "in_progress" || tool.status === "created") {
    return <StatusView status="in_progress" title={loadingMessages.title} description={loadingMessages.description} />
  }

  if (tool.status === "completed") {
    const parsed = schema.safeParse(tool.arguments)
    if (!parsed.success) {
      console.error(`Invalid arguments for tool "${tool.name}":`, parsed.error)
      return <StatusView status="error" title="Invalid data for tool." description="The data received is malformed." />
    }

    return (
      <ErrorBoundary
        fallback={<StatusView status="error" title="Something went wrong!" description="Please try again." />}>
        {/* User don't care what's happening in the background so, instead of display that components being loaded we will simply display that it's being loaded from the backend */}
        <Suspense
          fallback={
            <StatusView status="in_progress" title={loadingMessages.title} description={loadingMessages.description} />
          }>
          {/* @ts-expect-error -- The schema validation ensures this is correct */}
          <Component {...parsed.data} />
        </Suspense>
      </ErrorBoundary>
    )
  }

  return null
}
