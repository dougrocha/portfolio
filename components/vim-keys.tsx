"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Kbd } from "@/components/ui/kbd"
import { cn } from "@/lib/utils"

const storageKey = "vim-keys"

const goTo: Record<string, string> = {
  h: "/",
  p: "/projects",
  c: "/craft",
}

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

function getEnabled() {
  try {
    return localStorage.getItem(storageKey) === "on"
  } catch {
    return false
  }
}

function setEnabled(on: boolean) {
  try {
    if (on) localStorage.setItem(storageKey, "on")
    else localStorage.removeItem(storageKey)
  } catch {
    return
  }
  listeners.forEach((listener) => listener())
}

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

/** Links in the page body that are rendered, in document order. */
function links() {
  return Array.from(
    document.querySelectorAll<HTMLElement>("main a[href]")
  ).filter((link) => link.getClientRects().length > 0)
}

function focusLink(index: number) {
  const all = links()
  if (all.length === 0) return
  const link = all[Math.max(0, Math.min(index, all.length - 1))]
  link.focus({ preventScroll: true })
  link.scrollIntoView({ block: "nearest" })
}

function step(by: number) {
  const all = links()
  const current = all.indexOf(document.activeElement as HTMLElement)
  if (current === -1) {
    focusLink(by > 0 ? 0 : all.length - 1)
    return
  }
  focusLink(current + by)
}

/**
 * Off until turned on from the footer. Then j and k move between links,
 * gg and G jump to the first and last, and gh, gp and gc go to the home,
 * projects and craft pages.
 */
export function VimKeys() {
  const router = useRouter()
  const enabled = React.useSyncExternalStore(subscribe, getEnabled, () => false)
  const [pending, setPending] = React.useState(false)
  const [status, setStatus] = React.useState("")

  React.useEffect(() => {
    if (!enabled) return

    let timeout: ReturnType<typeof setTimeout> | undefined
    let waiting = false

    function wait(on: boolean) {
      waiting = on
      setPending(on)
      clearTimeout(timeout)
      if (on) timeout = setTimeout(() => wait(false), 1000)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return
      if (event.altKey || isTyping(event.target)) return
      if (document.querySelector("[aria-modal='true']")) return

      const key = event.key

      if (waiting) {
        wait(false)
        if (key === "g") {
          event.preventDefault()
          window.scrollTo({ top: 0 })
          focusLink(0)
          return
        }
        if (goTo[key]) {
          event.preventDefault()
          router.push(goTo[key])
          return
        }
      }

      if (key === "j" || key === "k") {
        event.preventDefault()
        step(key === "j" ? 1 : -1)
      } else if (key === "G") {
        event.preventDefault()
        window.scrollTo({ top: document.body.scrollHeight })
        focusLink(Infinity)
      } else if (key === "g" && !event.repeat) {
        wait(true)
      } else if (key === "Escape") {
        const active = document.activeElement
        if (active instanceof HTMLElement && links().includes(active)) {
          active.blur()
        }
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      clearTimeout(timeout)
      setPending(false)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [enabled, router])

  function toggle() {
    setEnabled(!enabled)
    setStatus(enabled ? "Vim keys off" : "Vim keys on")
  }

  return (
    <div className="hidden flex-col gap-3 sm:flex sm:items-end sm:text-right">
      <p>
        <button
          type="button"
          aria-pressed={enabled}
          onClick={toggle}
          className="rounded-sm underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-current focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-hidden"
        >
          Vim keys<span aria-hidden="true"> {enabled ? "on" : "off"}</span>
        </button>
      </p>
      {enabled && (
        <p>
          <Kbd>j</Kbd> <Kbd>k</Kbd> to move, <Kbd>gg</Kbd> <Kbd>G</Kbd> for top
          and bottom, <Kbd>gh</Kbd> <Kbd>gp</Kbd> <Kbd>gc</Kbd> to go home,
          projects or craft.
        </p>
      )}
      <p role="status" className="sr-only">
        {status}
      </p>
      <kbd
        aria-hidden="true"
        className={cn(
          "fixed right-4 bottom-4 z-50 rounded-sm bg-muted px-1.5 font-mono text-sm text-muted-foreground",
          !pending && "hidden"
        )}
      >
        g
      </kbd>
    </div>
  )
}
