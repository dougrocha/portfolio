"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Dialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ResumeViewer = dynamic(
  () => import("@/components/resume-viewer").then((mod) => mod.ResumeViewer),
  {
    ssr: false,
    loading: () => (
      <p role="status" className="text-muted-foreground">
        Loading resume…
      </p>
    ),
  }
)

const resumeHref = "/resume.pdf"
const resumeFilename = "Doug-Rocha-Resume.pdf"

export function ResumeDialog() {
  const [open, setOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={cn(buttonVariants({ size: "sm" }))}>
        Resume
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-foreground/30" />
        <Dialog.Popup
          ref={popupRef}
          initialFocus={popupRef}
          aria-modal={true}
          className="fixed top-0 left-0 z-[61] flex h-dvh w-screen flex-col bg-background text-foreground outline-none focus-visible:outline-none sm:top-1/2 sm:left-1/2 sm:h-[min(92dvh,60rem)] sm:w-[min(48rem,calc(100vw-2rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-lg sm:border sm:border-border"
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
            <Dialog.Title className="text-sm font-title">Resume</Dialog.Title>
            <div className="flex items-center gap-2">
              <a
                href={resumeHref}
                download={resumeFilename}
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Download
                <span className="sr-only"> resume</span>
              </a>
              <Dialog.Close
                aria-label="Close"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" })
                )}
              >
                <X aria-hidden="true" />
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Description className="sr-only">
            Doug Rocha&apos;s resume. The text can be selected and copied.
          </Dialog.Description>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-5">
            {open ? <ResumeViewer /> : null}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
