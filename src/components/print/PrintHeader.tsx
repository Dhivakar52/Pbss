import React from 'react'
import logoImg from '@/assets/images/logo.png'

interface PrintHeaderProps {
  documentTitle: string
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({ documentTitle }) => {
  return (
    <div className="pbss-fixed-header relative flex items-center justify-start gap-4 mb-4 pt-1 pb-2 border-b border-gray-200 shrink-0">
      <div className="w-[60px] h-[60px] shrink-0">
        <img src={logoImg} alt="PSBB Logo" className="w-[60px] h-[60px] object-contain" />
      </div>
      <div className="text-center flex-1 pr-[60px]">
        <h1 className="text-[16px] font-bold text-black tracking-tight leading-tight">
          Padma Seshadri Bala Bhavan Sr. Sec. School
        </h1>
        <p className="text-[12.5px] font-normal text-black mt-0.5">
          No.17,Thirumalai Road,T.Nagar,Chennai - 17.
        </p>
        <h2 className="text-[13.5px] font-bold text-black mt-1">
          {documentTitle}
        </h2>
      </div>
    </div>
  )
}
