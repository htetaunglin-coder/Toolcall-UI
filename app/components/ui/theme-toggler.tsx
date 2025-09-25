"use client"

import { useEffect, useState } from "react"
import { Button, ButtonProps } from "@mijn-ui/react-button"
import { useTheme } from "next-themes"
import { Icons } from "./icons"

/* -------------------------------------------------------------------------- */

const ThemeToggler = ({ ...props }: ButtonProps) => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return

  if (resolvedTheme === "dark") {
    return (
      <Button variant="ghost" className="rounded-full" iconOnly size="sm" onClick={() => setTheme("light")} {...props}>
        <Icons.sun className="text-base" />
      </Button>
    )
  }
  if (resolvedTheme === "light") {
    return (
      <Button variant="ghost" className="rounded-full" iconOnly size="sm" onClick={() => setTheme("dark")} {...props}>
        <Icons.moon className="text-sm" />
      </Button>
    )
  }
}

export default ThemeToggler
