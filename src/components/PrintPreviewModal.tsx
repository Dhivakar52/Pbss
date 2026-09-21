import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Printer, X, FileText } from 'lucide-react'
import { RegistrationFormDocument } from './RegistrationFormDocument'
import { TrackSheetDocument } from './TrackSheetDocument'
import type { PrintDocumentData } from '@/types/printTypes'

interface PrintPreviewModalProps {
  documentType: 'registrationForm' | 'trackSheet' | null
  data: PrintDocumentData
  isOpen: boolean
  onClose: () => void
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  documentType,
  data,
  isOpen,
  onClose,
}) => {
  const [scale, setScale] = useState<number>(0.92)
  const containerRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const updateScale = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 40
        const a4WidthPx = 794 // 210mm at 96 DPI
        if (availableWidth < a4WidthPx) {
          setScale(Math.max(0.4, availableWidth / a4WidthPx))
        } else {
          setScale(0.92)
        }
      }
    }

    updateScale()
    const timer = setTimeout(updateScale, 50)
    window.addEventListener('resize', updateScale)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateScale)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
      }
      setTimeout(() => {
        const modalContent = document.querySelector('[role="dialog"]')
        if (modalContent) {
          modalContent.scrollTop = 0
          modalContent.scrollLeft = 0
        }
      }, 0)
    }
  }, [isOpen])

  if (!isOpen || !documentType) return null

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    }
    setTimeout(() => {
      window.print()
    }, 50)
  }

  const title = documentType === 'registrationForm' ? 'Registration Form' : 'Track Sheet'

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="p-0 rounded-xl border border-slate-200 overflow-hidden max-h-[92vh] print:hidden max-w-[1050px] w-[95vw] flex flex-col"
        >
          <DialogHeader className="bg-slate-50 px-6 py-3.5 border-b border-slate-200 print:hidden shrink-0 z-20">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-slate-900">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <DialogTitle className="text-base font-semibold">
                    {title} Print Preview
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                    Fixed Header & Footer A4 document matching official reference PDF
                  </DialogDescription>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Responsive Scaled Screen Preview Container */}
          <div
            ref={containerRef}
            className="p-4 bg-slate-100 flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden print:hidden flex-1"
          >
            <div
              className="print-preview-scale-wrapper flex flex-col items-center transition-transform duration-150"
              style={{
                width: `${794 * scale}px`,
                position: 'relative',
              }}
            >
              <div
                className="print-preview-scaled-target shadow-xl bg-white"
                style={{
                  width: '210mm',
                  transform: `scale(${scale})`,
                  transformOrigin: 'top center',
                }}
              >
                {documentType === 'registrationForm' ? (
                  <RegistrationFormDocument data={data} />
                ) : (
                  <TrackSheetDocument data={data} />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between print:hidden sticky bottom-0 z-20">
            <Button variant="outline" size="sm" onClick={onClose} className="text-xs cursor-pointer">
              <X className="h-3.5 w-3.5 mr-1" /> Close
            </Button>

            <Button
              size="sm"
              onClick={handlePrint}
              className="text-xs gap-1.5 text-white cursor-pointer bg-[#1677FF] hover:bg-[#0958D9]"
            >
              <Printer className="h-3.5 w-3.5" />
              Print {title}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Standalone Print-Only Portal attached directly to document.body */}
      {isOpen &&
        createPortal(
          <div className="pbss-standalone-print-portal">
            {documentType === 'registrationForm' ? (
              <RegistrationFormDocument data={data} />
            ) : (
              <TrackSheetDocument data={data} />
            )}
          </div>,
          document.body
        )}
    </>
  )
}

export default PrintPreviewModal
