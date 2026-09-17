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
    <div className="pbss-fixed-footer text-[12px] pt-1 border-t border-gray-200 shrink-0 flex items-center justify-between">
      <div className="text-[10.5px] text-gray-400 font-sans">
        Padma Seshadri Bala Bhavan Sr. Sec. School - T.Nagar
      </div>
      <div className="flex flex-col items-end text-[12px]">
        <div className="flex items-center gap-1.5 justify-end">
          <span className="font-bold">Reg No.</span>
          <span className="font-bold">:</span>
          <span className="min-w-[65px] font-normal">{registrationNo}</span>
        </div>
        <div className="flex items-center gap-1.5 justify-end mt-0.5">
          <span className="font-bold">Child's Name :</span>
          <span className="min-w-[65px] font-normal">{childName}</span>
        </div>
      </div>
    </div>
  )
}
