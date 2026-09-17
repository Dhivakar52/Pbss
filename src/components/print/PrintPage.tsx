import React from 'react'
import { PrintHeader } from './PrintHeader'
import { PrintFooter } from './PrintFooter'

interface PrintPageProps {
  documentTitle: string
  registrationNo?: string
  childName?: string
  showSidebar?: boolean
  showRegFooter?: boolean
  children: React.ReactNode
}

export const PrintPage: React.FC<PrintPageProps> = ({
  documentTitle,
  registrationNo,
  childName,
  showSidebar = true,
  showRegFooter = true,
  children,
}) => {
  return (
    <div className="pbss-print-page relative box-border bg-white">
      {/* Left Vertical Gray Sidebar Title */}
      {showSidebar && (
        <div className="pbss-left-sidebar">
          <span>Padma Seshadri Bala Bhavan Senior Secondary School</span>
        </div>
      )}

      {/* Page Layout Container using Print Table */}
      <div className={`${showSidebar ? 'pbss-page-content' : 'pbss-page-content-full'}`}>
        <table className="pbss-print-table w-full border-collapse">
          <thead>
            <tr>
              <th className="p-0 font-normal text-left border-none bg-white">
                <PrintHeader documentTitle={documentTitle} />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-0 font-normal align-top border-none bg-white">
                <div className="pbss-dynamic-body py-1 flex flex-col justify-start overflow-visible">
                  {children}
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="p-0 font-normal border-none bg-white">
                <PrintFooter
                  registrationNo={registrationNo}
                  childName={childName}
                  showRegFooter={showRegFooter}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
