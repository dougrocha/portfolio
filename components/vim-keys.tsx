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
  r: "/resume",
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

const focusable = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "summary",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(",")

/** Letters hints are made of, easiest to reach first. */
const hintKeys = "sadfjklewcmpgh"

type Hint = { label: string; element: HTMLElement; top: number; left: number }

/** Rough size of a two letter hint, to keep hints inside the viewport. */
const hintWidth = 28
const hintHeight = 20

/**
 * Everything on screen that can take focus, in document order. Anything
 * 1px or smaller is skipped, which drops screen-reader-only links.
 */
function targets() {
  return Array.from(document.querySelectorAll<HTMLElement>(focusable)).filter(
    (element) => {
      if (element.closest("[inert], [aria-hidden='true']")) return false
      if (element.matches(":disabled")) return false
      if (!element.checkVisibility({ visibilityProperty: true })) return false
      const rect = element.getBoundingClientRect()
      return (
        rect.width > 1 &&
        rect.height > 1 &&
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < window.innerHeight &&
        rect.left < window.innerWidth
      )
    }
  )
}

/** Equal length labels, as short as the count allows, so none starts another. */
function labels(count: number) {
  const keys = hintKeys.split("")
  let names = keys
  while (names.length < count) {
    names = names.flatMap((prefix) => keys.map((key) => prefix + key))
  }
  return names.slice(0, count)
}

function clamp(value: number, max: number) {
  return Math.max(0, Math.min(value, max))
}

function hintsFor(elements: HTMLElement[]): Hint[] {
  const names = labels(elements.length)
  return elements.map((element, index) => {
    const rect = element.getBoundingClientRect()
    return {
      label: names[index],
      element,
      top: clamp(rect.top, window.innerHeight - hintHeight),
      left: clamp(rect.left, window.innerWidth - hintWidth),
    }
  })
}

/** Text fields take focus, everything else is clicked. */
function activate(element: HTMLElement) {
  element.focus({ preventScroll: true })
  const field =
    element.isContentEditable ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement ||
    (element instanceof HTMLInputElement &&
      !["button", "submit", "reset", "checkbox", "radio"].includes(
        element.type
      ))
  if (!field) element.click()
}

/**
 * Off until turned on from the footer. Then j and k scroll, d and u scroll
 * half a page, gg and G jump to the top and bottom, and gh, gp and gc go to
 * the home, projects, craft and resume pages. f labels everything on screen that can
 * take focus, and typing a label focuses or clicks it. Tab works as usual.
 */
export function VimKeys() {
  const router = useRouter()
  const enabled = React.useSyncExternalStore(subscribe, getEnabled, () => false)
  const [pending, setPending] = React.useState(false)
  const [hints, setHints] = React.useState<Hint[]>([])
  const [typed, setTyped] = React.useState("")
  const [status, setStatus] = React.useState("")

  React.useEffect(() => {
    if (!enabled) return

    let timeout: ReturnType<typeof setTimeout> | undefined
    let waiting = false
    let shown: Hint[] = []
    let prefix = ""

    function wait(on: boolean) {
      waiting = on
      setPending(on)
      clearTimeout(timeout)
      if (on) timeout = setTimeout(() => wait(false), 1000)
    }

    function show(next: Hint[]) {
      shown = next
      prefix = ""
      setHints(next)
      setTyped("")
    }

    function hide() {
      if (shown.length > 0) show([])
    }

    function onHintKey(event: KeyboardEvent) {
      if (event.key === "Tab") {
        show([])
        return
      }

      event.preventDefault()
      event.stopPropagation()
      if (event.repeat) return

      if (event.key === "Escape") {
        show([])
        return
      }
      if (event.key === "Backspace") {
        prefix = prefix.slice(0, -1)
        setTyped(prefix)
        return
      }

      const next = prefix + event.key.toLowerCase()
      const matches = shown.filter((hint) => hint.label.startsWith(next))
      if (matches.length === 0) return
      if (matches.length === 1 && matches[0].label === next) {
        show([])
        activate(matches[0].element)
        return
      }
      prefix = next
      setTyped(next)
    }

    /**
     * Listens in the capture phase, so vim keys win over page shortcuts
     * such as d for the theme, which skip events that are already handled.
     */
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return
      if (event.altKey || event.isComposing) return

      if (shown.length > 0) {
        onHintKey(event)
        return
      }

      if (document.querySelector("[aria-modal='true']")) return

      const key = event.key

      if (key === "Escape") {
        const active = document.activeElement
        if (active instanceof HTMLElement && active !== document.body) {
          active.blur()
        }
        return
      }

      if (isTyping(event.target)) return

      if (waiting) {
        wait(false)
        if (key === "g") {
          event.preventDefault()
          window.scrollTo({ top: 0 })
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
        window.scrollBy({ top: key === "j" ? 64 : -64 })
      } else if (key === "d" || key === "u") {
        event.preventDefault()
        const half = window.innerHeight / 2
        window.scrollBy({ top: key === "d" ? half : -half })
      } else if (key === "G") {
        event.preventDefault()
        window.scrollTo({ top: document.body.scrollHeight })
      } else if (key === "g" && !event.repeat) {
        wait(true)
      } else if (key === "f" && !event.repeat) {
        event.preventDefault()
        show(hintsFor(targets()))
      }
    }

    window.addEventListener("keydown", onKeyDown, true)
    window.addEventListener("scroll", hide, true)
    window.addEventListener("resize", hide)
    window.addEventListener("pointerdown", hide)
    return () => {
      clearTimeout(timeout)
      setPending(false)
      setHints([])
      setTyped("")
      window.removeEventListener("keydown", onKeyDown, true)
      window.removeEventListener("scroll", hide, true)
      window.removeEventListener("resize", hide)
      window.removeEventListener("pointerdown", hide)
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
          <Kbd>j</Kbd> <Kbd>k</Kbd> <Kbd>d</Kbd> <Kbd>u</Kbd> to scroll,{" "}
          <Kbd>gg</Kbd> <Kbd>G</Kbd> for top and bottom, <Kbd>f</Kbd> to pick
          anything on screen, <Kbd>gh</Kbd> <Kbd>gp</Kbd> <Kbd>gc</Kbd>{" "}
          <Kbd>gr</Kbd> to go home, projects, craft or resume.
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
      {hints.length > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70]"
        >
          {hints
            .filter((hint) => hint.label.startsWith(typed))
            .map((hint) => (
              <kbd
                key={hint.label}
                style={{ top: hint.top, left: hint.left }}
                className="absolute rounded-sm bg-foreground px-1 font-mono text-xs text-background uppercase"
              >
                <span className="opacity-50">{typed}</span>
                {hint.label.slice(typed.length)}
              </kbd>
            ))}
        </div>
      )}
    </div>
  )
}
