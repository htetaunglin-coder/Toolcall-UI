"use client"

import { Button, cn, Collapsible, CollapsibleContent, CollapsibleTrigger, Separator } from "@mijn-ui/react"
import * as React from "react"

export function CodeCollapsibleWrapper({ className, children, ...props }: React.ComponentProps<typeof Collapsible>) {
  const [isOpened, setIsOpened] = React.useState(false)

  return (
    <Collapsible
      open={isOpened}
      onOpenChange={setIsOpened}
      className={cn("group/collapsible relative md:-mx-1", className)}
      {...props}>
      <CollapsibleTrigger asChild>
        <div className="absolute right-9 top-1.5 z-10 flex items-center">
          <Button variant="ghost" size="sm" className="h-7 rounded-md px-2 text-muted-foreground">
            {isOpened ? "Collapse" : "Expand"}
          </Button>
          <Separator orientation="vertical" className="mx-1.5 !h-4" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent
        forceMount
        className="relative mt-6 overflow-hidden data-[state=closed]:max-h-80 [&>figure]:mt-0 [&>figure]:md:!mx-0">
        {children}
      </CollapsibleContent>
      <CollapsibleTrigger className="absolute inset-x-0 -bottom-0 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b from-background-alt/70 to-background-alt text-sm text-muted-foreground group-data-[state=open]/collapsible:hidden">
        {isOpened ? "Collapse" : "Expand"}
      </CollapsibleTrigger>
    </Collapsible>
  )
}
