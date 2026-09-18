import React from 'react'

interface PrintFooterProps {
  registrationNo?: string
  childName?: string
  showRegFooter?: boolean
}

export const PrintFooter: React.FC<PrintFooterProps> = ({
  registrationNo = '',
  childName = '',
  showRegFooter = true,
}) => {
  if (!showRegFooter) {
    return <div className="pbss-fixed-footer h-[24px] shrink-0" />
  }

  return (
    <div className="pbss-fixed-footer text-[12px] pt-1 border-t border-gray-200 shrink-0 flex items-center justify-between gap-4 bg-white whitespace-nowrap min-w-0">
      <div className="text-[10.5px] text-gray-400 font-sans whitespace-nowrap shrink-0">
        Padma Seshadri Bala Bhavan Sr. Sec. School - T.Nagar
      </div>
      <div className="flex items-center justify-end gap-3 text-[12px] min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
          <span className="font-bold">Reg No.</span>
          <span className="font-bold">:</span>
          <span className="font-normal min-w-[65px]">{registrationNo}</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden justify-end">
          <span className="font-bold whitespace-nowrap shrink-0">Child's Name :</span>
          <span
            className="font-normal whitespace-nowrap overflow-hidden text-ellipsis min-w-0 text-right inline-block max-w-[280px]"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}
            title={childName}
          >
            {childName}
          </span>
        </div>
      </div>
    </div>
  )
}
