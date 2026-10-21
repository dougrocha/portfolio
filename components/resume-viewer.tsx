"use client"

import { useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

const resumeHref = "/resume.pdf"

/** `externalLinkTarget` covers every link, but a mail link in a new tab only opens a blank page. */
function openMailInPlace(frame: HTMLElement | null) {
  frame?.querySelectorAll("a[href^='mailto:']").forEach((link) => {
    link.removeAttribute("target")
  })
}

export function ResumeViewer() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [numPages, setNumPages] = useState(0)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return

    const measure = () => {
      setWidth(Math.floor(frame.clientWidth))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={frameRef} className="w-full">
      <Document
        file={resumeHref}
        suspense={false}
        loading={
          <p role="status" className="text-muted-foreground">
            Loading resume…
          </p>
        }
        error={
          <p role="alert" className="text-pretty text-muted-foreground">
            The resume didn&apos;t load.
          </p>
        }
        onLoadSuccess={({ numPages: next }) => setNumPages(next)}
        externalLinkTarget="_blank"
      >
        {width > 0 && numPages > 0 ? (
          <ol className="flex flex-col gap-4">
            {Array.from({ length: numPages }, (_, index) => {
              const pageNumber = index + 1
              return (
                <li key={pageNumber} className="flex justify-center">
                  <Page
                    pageNumber={pageNumber}
                    width={width}
                    renderTextLayer
                    renderAnnotationLayer
                    onRenderAnnotationLayerSuccess={() =>
                      openMailInPlace(frameRef.current)
                    }
                    suspense={false}
                    className="resume-page bg-white outline outline-border"
                    loading={
                      <p role="status" className="sr-only">
                        Loading page {pageNumber}
                      </p>
                    }
                  />
                </li>
              )
            })}
          </ol>
        ) : null}
      </Document>
    </div>
  )
}
