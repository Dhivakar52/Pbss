import React from 'react'
import logoImg from '@/assets/images/logo.png'

interface PrintHeaderProps {
  documentTitle: string
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({ documentTitle }) => {
  return (
    <div className="pbss-fixed-header relative flex items-center justify-start mb-4 pt-1 pb-1 shrink-0">
      <div className="w-[72px] h-[72px] shrink-0 absolute left-0 top-0">
        <img src={logoImg} alt="PSBB Logo" className="w-[72px] h-[72px] object-contain" />
      </div>
      <div className="text-center w-full pl-[76px]">
        <h1 className="text-[21px] font-normal text-black tracking-normal leading-tight font-sans">
          Padma Seshadri Bala Bhavan Sr. Sec. School
        </h1>
        <p className="text-[15px] font-normal text-black mt-1 font-sans">
          No.17,Thirumalai Road,T.Nagar,Chennai - 17.
        </p>
        <h2 className="text-[16px] font-normal text-black mt-1 font-sans">
          {documentTitle}
        </h2>
      </div>
    </div>
  )
}
