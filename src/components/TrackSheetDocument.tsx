import React from 'react'
import type { PrintDocumentData } from '@/types/printTypes'
import { PrintPage } from './print/PrintPage'

interface Props {
  data: PrintDocumentData
}

export const TrackSheetDocument: React.FC<Props> = ({ data }) => {
  const reg = data.registration
  const father = data.father
  const mother = data.mother
  const addr = data.address
  const photos = data.photos
  const signatures = data.signatures

  const regNo = reg.registrationNo || ''
  const childName = reg.childName || ''

  // Pad siblings table to 3 rows
  const sibList = data.siblings || []
  const displaySiblings = [...sibList]
  while (displaySiblings.length < 3) {
    displaySiblings.push({
      name: '',
      school: '',
      usn: '',
      classSec: '',
      yearLeaving: '',
    })
  }

  const formatBool = (val?: boolean) => {
    if (val === undefined || val === null) return ''
    return val ? 'Yes' : 'No'
  }

  const documentTitle = 'Track Sheet for Registration into Pre KG 2024-25'

  return (
    <div className="pbss-print-wrapper bg-white text-black text-[12.5px] leading-snug font-sans">
      {/* ==========================================
         PAGE 1 OF 3 - TRACK SHEET
         ========================================== */}
      <PrintPage
        documentTitle={documentTitle}
        registrationNo={regNo}
        childName={childName}
        showSidebar={false}
        showRegFooter={true}
      >
        <div className="space-y-3">
          {/* Header Block & Applicant Photo Box */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1 space-y-2">
              {/* Row 1: Reg No */}
              <div className="flex items-center gap-2 text-[12.5px]">
                <span className="font-bold w-[150px]">Registration No.</span>
                <span className="font-bold mr-1">:</span>
                <div className="border border-black px-3 py-0.5 min-w-[120px] h-[24px] inline-flex items-center text-[12.5px] font-normal">
                  {regNo}
                </div>
              </div>

              {/* Row 2: Name of the Child */}
              <div className="flex items-baseline text-[12.5px]">
                <span className="font-bold w-[150px]">Name of the Child</span>
                <span className="font-bold mr-3">:</span>
                <span className="font-normal flex-1">{childName}</span>
              </div>

              {/* Row 3: DOB & Gender */}
              <div className="grid grid-cols-12 gap-2 text-[12.5px] items-baseline">
                <div className="col-span-6 flex items-baseline">
                  <span className="font-bold w-[150px]">Date of Birth</span>
                  <span className="font-bold mr-3">:</span>
                  <span className="font-normal">{reg.dateOfBirth}</span>
                </div>
                <div className="col-span-6 flex items-baseline">
                  <span className="font-bold w-[100px]">Gender</span>
                  <span className="font-bold mr-3">:</span>
                  <span className="font-normal">{reg.gender}</span>
                </div>
              </div>

              {/* Row 4: Mother Tongue */}
              <div className="flex items-baseline text-[12.5px]">
                <span className="font-bold w-[150px]">Mother Tongue</span>
                <span className="font-bold mr-3">:</span>
                <span className="font-normal">{reg.motherTongue}</span>
              </div>

              {/* Row 5: Religion & Caste */}
              <div className="grid grid-cols-12 gap-2 text-[12.5px] items-baseline">
                <div className="col-span-6 flex items-baseline">
                  <span className="font-bold w-[150px]">Religion</span>
                  <span className="font-bold mr-3">:</span>
                  <span className="font-normal">{reg.religion}</span>
                </div>
                <div className="col-span-6 flex items-baseline">
                  <span className="font-bold w-[100px]">Caste</span>
                  <span className="font-bold mr-3">:</span>
                  <span className="font-normal">{reg.caste}</span>
                </div>
              </div>

              {/* Row 6: Residential Address */}
              <div className="flex items-baseline text-[12.5px]">
                <span className="font-bold w-[150px]">Residential Address</span>
                <span className="font-bold mr-3">:</span>
                <span className="font-normal flex-1">{addr.residentialAddress}</span>
              </div>
            </div>

            {/* Applicant Photo Box */}
            <div className="w-[120px] h-[140px] border border-black p-1.5 flex items-center justify-center text-center text-[10px] leading-tight font-bold shrink-0 bg-white">
              {photos.child ? (
                <img src={photos.child} alt="Applicant" className="w-full h-full object-contain" />
              ) : (
                <span>Affix latest Passport size photo of the applicant with Reg No. at the back.</span>
              )}
            </div>
          </div>

          {/* Contact & Transport Info */}
          <div className="space-y-2 mb-2">
            <div className="grid grid-cols-12 gap-2 text-[12.5px] items-baseline">
              <div className="col-span-6 flex items-baseline">
                <span className="font-bold w-[150px]">Father's Mobile No</span>
                <span className="font-bold mr-3">:</span>
                <span className="font-normal">{father.mobileNo}</span>
              </div>
              <div className="col-span-6 flex items-baseline">
                <span className="font-bold w-[140px]">Mother's Mobile No :</span>
                <span className="font-normal">{mother.mobileNo}</span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-2 text-[12.5px] items-baseline">
              <div className="col-span-6 flex items-baseline">
                <span className="font-bold w-[150px]">Distance from Residence</span>
                <span className="font-bold mr-3">:</span>
                <span className="font-normal">{addr.distanceFromResidence}</span>
              </div>
              <div className="col-span-6 flex items-baseline">
                <span className="font-bold w-[140px]">Mode of Transport :</span>
                <span className="font-normal">{addr.modeOfTransport?.join(', ')}</span>
              </div>
            </div>

            <div className="flex items-baseline text-[12.5px]">
              <span className="font-bold w-[320px]">Does the child have any school going Siblings?</span>
              <span className="font-bold mr-3">:</span>
              <span className="font-normal">{formatBool(reg.hasSiblings)}</span>
            </div>
          </div>

          {/* Siblings Table */}
          <div className="mb-3">
            <table className="w-full border-collapse border border-black text-center text-[11.5px]">
              <thead>
                <tr className="border-b border-black font-bold">
                  <th className="border-r border-black p-1.5 w-[24%] font-bold">Name of the Sibling</th>
                  <th className="border-r border-black p-1.5 w-[24%] font-bold">Name of the School</th>
                  <th className="border-r border-black p-1.5 w-[14%] font-bold">USN</th>
                  <th className="border-r border-black p-1.5 w-[14%] font-bold">Class / Sec</th>
                  <th className="p-1.5 w-[24%] font-bold leading-tight">
                    Year&Class Of Leaving If Former/Left Student
                  </th>
                </tr>
              </thead>
              <tbody>
                {displaySiblings.slice(0, 3).map((sib, i) => (
                  <tr key={i} className="border-b border-black h-[28px] last:border-b-0">
                    <td className="border-r border-black p-1 text-left px-2 truncate max-w-[120px]">{sib.name}</td>
                    <td className="border-r border-black p-1 text-left px-2 truncate max-w-[120px]">{sib.school}</td>
                    <td className="border-r border-black p-1">{sib.usn}</td>
                    <td className="border-r border-black p-1">{sib.classSec}</td>
                    <td className="p-1">{sib.yearLeaving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Parents Qualification & Income */}
          <div className="space-y-2 text-[12.5px]">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-baseline">
                <span className="font-bold w-[130px]">Father’s Name :</span>
                <span className="font-normal flex-1">{father.name}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-bold w-[130px]">Mother’s Name :</span>
                <span className="font-normal flex-1">{mother.name}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-baseline">
                <span className="font-bold w-[130px] leading-tight">Father’s<br />Qualification</span>
                <span className="font-bold mr-2 self-center">:</span>
                <span className="font-normal flex-1 self-center">{father.qualification}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-bold w-[130px] leading-tight">Mother’s<br />Qualification</span>
                <span className="font-bold mr-2 self-center">:</span>
                <span className="font-normal flex-1 self-center">{mother.qualification}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-baseline">
                <span className="font-bold w-[130px] leading-tight">Father’s<br />Designation</span>
                <span className="font-bold mr-2 self-center">:</span>
                <span className="font-normal flex-1 self-center">{father.designation}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-bold w-[130px] leading-tight">Mother’s<br />Designation</span>
                <span className="font-bold mr-2 self-center">:</span>
                <span className="font-normal flex-1 self-center">{mother.designation}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-baseline">
                <span className="font-bold w-[130px] leading-tight">Father’s<br />Income</span>
                <span className="font-bold mr-2 self-center">:</span>
                <span className="font-normal flex-1 self-center">{father.monthlyIncome}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-bold w-[130px] leading-tight">Mother’s<br />Income</span>
                <span className="font-bold mr-2 self-center">:</span>
                <span className="font-normal flex-1 self-center">{mother.monthlyIncome}</span>
              </div>
            </div>
          </div>
        </div>
      </PrintPage>

      {/* ==========================================
         PAGE 2 OF 3 - TRACK SHEET
         ========================================== */}
      <PrintPage
        documentTitle={documentTitle}
        registrationNo={regNo}
        childName={childName}
        showSidebar={false}
        showRegFooter={true}
      >
        <div className="space-y-3 text-[12px]">
          {/* Alumnus Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Is Father an Alumnus?</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{formatBool(father.isAlumnus)}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Is Mother an Alumnus?</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{formatBool(mother.isAlumnus)}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Year of Passing/ Leaving</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.yearOfLeaving}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Year of Passing/ Leaving :</span>
              <span className="font-normal">{mother.yearOfLeaving}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">No of Years Studied</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.yearsStudied}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">No of Years Studied</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.yearsStudied}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Class Last Studied</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.classLastStudied}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Class Last Studied</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.classLastStudied}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Branch</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.branch}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Branch</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.branch}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Reason for Leaving</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.reasonForLeaving}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Reason for Leaving</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.reasonForLeaving}</span>
            </div>
          </div>

          {/* Health Details & 3 Photo Boxes */}
          <div className="grid grid-cols-12 gap-4 items-start pt-1">
            <div className="col-span-5 space-y-2 text-[12px]">
              <div className="flex items-baseline">
                <span className="font-bold leading-tight">
                  Is the child a normal<br />healthy child
                </span>
                <span className="font-bold ml-2 mr-2">:</span>
                <span className="font-normal">{formatBool(reg.isHealthy)}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-bold leading-tight">
                  Specify Major ailment, If<br />any (Past/Present)
                </span>
                <span className="font-bold ml-2 mr-2">:</span>
                <span className="font-normal">{reg.majorAilment}</span>
              </div>
            </div>

            {/* 3 Photo Boxes */}
            <div className="col-span-7 grid grid-cols-3 gap-2">
              {/* Guardian Photo Box */}
              <div className="border border-black p-1.5 h-[130px] flex items-center justify-center text-center text-[9px] leading-tight font-bold bg-white">
                {photos.guardian ? (
                  <img src={photos.guardian} alt="Guardian" className="w-full h-full object-contain" />
                ) : (
                  <span>Affix latest Passport size photo of the Guardian (if applicable) with Reg No. at the back.</span>
                )}
              </div>

              {/* Father Photo Box */}
              <div className="border border-black p-1.5 h-[130px] flex items-center justify-center text-center text-[9px] leading-tight font-bold bg-white">
                {photos.father ? (
                  <img src={photos.father} alt="Father" className="w-full h-full object-contain" />
                ) : (
                  <span>Affix latest Passport size photo of the Father with Reg No. at the back.</span>
                )}
              </div>

              {/* Mother Photo Box */}
              <div className="border border-black p-1.5 h-[130px] flex items-center justify-center text-center text-[9px] leading-tight font-bold bg-white">
                {photos.mother ? (
                  <img src={photos.mother} alt="Mother" className="w-full h-full object-contain" />
                ) : (
                  <span>Affix latest Passport size photo of the Mother with Reg No. at the back.</span>
                )}
              </div>
            </div>
          </div>

          {/* Declaration Block */}
          <div className="pt-1 text-[12px] leading-relaxed">
            <p className="text-justify font-normal">
              We, the parents (father & mother) / guardian of{' '}
              <span className="font-bold underline px-1">{childName || '__________________________________'}</span>{' '}
              seeking his / her admission to Pre-KG hereby solemnly declare that the information furnished above is
              absolutely true and that if found factually incorrect at any time after the admission during his / her stay in
              school, We shall abide by the orders of the school for withdrawal of our son/daughter/ward without any plea or
              protest. We also understand and accept that submission of online registration form and track sheet does not
              guarantee admission.
            </p>
          </div>

          {/* Signatures Area */}
          <div className="pt-2 text-[12px]">
            <div className="flex justify-between items-start">
              <div className="flex items-baseline">
                <span className="font-bold">Date :</span>
                <span className="ml-2 font-normal">{data.submission?.date || ''}</span>
              </div>
              <div className="flex items-center gap-6 font-bold text-[12px]">
                <div className="text-center">
                  {signatures.father ? (
                    <img src={signatures.father} alt="Father Signature" className="h-8 object-contain mb-1" />
                  ) : (
                    <div className="h-8" />
                  )}
                  <span>Signature of Father</span>
                </div>
                <div className="text-center">
                  {signatures.mother ? (
                    <img src={signatures.mother} alt="Mother Signature" className="h-8 object-contain mb-1" />
                  ) : (
                    <div className="h-8" />
                  )}
                  <span>Signature of Mother</span>
                </div>
                <div className="text-center">
                  {signatures.guardian ? (
                    <img src={signatures.guardian} alt="Guardian Signature" className="h-8 object-contain mb-1" />
                  ) : (
                    <div className="h-8" />
                  )}
                  <span>Signature of Guardian</span>
                  <br />
                  <span className="text-[10px] font-normal">(If Applicable)</span>
                </div>
              </div>
            </div>
            <p className="font-bold text-[11.5px] pt-3">Name in BLOCK LETTER :</p>
          </div>

          {/* Submission Details Outer Border Box */}
          <div className="border border-black p-2.5 text-[12px] space-y-1.5 mt-2 bg-white">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-baseline">
                <span className="font-bold w-[130px]">Date of Submission :</span>
                <span className="font-normal">{data.submission?.date || '14/09/2025'}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-bold w-[90px]">Reg No.</span>
                <span className="font-bold mr-2">:</span>
                <span className="font-normal">{regNo}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-baseline">
                <span className="font-bold w-[130px]">Timings</span>
                <span className="font-bold mr-2">:</span>
                <span className="font-normal">{data.submission?.timings || '9:00 AM - 11:00 AM'}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-bold w-[90px]">Child's Name :</span>
                <span className="font-normal">{childName}</span>
              </div>
            </div>
          </div>
        </div>
      </PrintPage>

      {/* ==========================================
         PAGE 3 OF 3 - TRACK SHEET
         ========================================== */}
      <PrintPage
        documentTitle={documentTitle}
        registrationNo={regNo}
        childName={childName}
        showSidebar={false}
        showRegFooter={false}
      >
        <div className="space-y-2 text-[11.5px] leading-snug">
          <p className="font-bold text-[12.5px]">Note:</p>

          <ul className="list-disc pl-4 space-y-1 font-normal text-black text-[11px] leading-snug">
            <li>Forms with False/ Incomplete/Vague information will not be considered.</li>
            <li>Submit the Track Sheet signed by both parents (to the school office of the branch applied for)</li>
            <li>
              Documents to be submitted in person by the parent only (with authorization letter from parent, if guardian):
              <ol className="list-decimal pl-5 pt-0.5 space-y-0.5">
                <li>
                  Track sheet signed by BOTH parents/guardian with recent photo of the child duly affixed
                  <br />
                  <span className="text-[10px]">(please mention Reg No. at the back of the photo)</span>
                </li>
                <li>Birth Certificate of Child - COPY</li>
                <li>Passport size photographs of both parents with Reg No. written at the back.</li>
                <li>Address proof of parents - COPY</li>
              </ol>
            </li>
            <li>
              Documents to be brought for verification:
              <ol className="list-decimal pl-5 pt-0.5 space-y-0.5">
                <li>Birth Certificate of Child - ORIGINAL</li>
                <li>Proof of Address of both Parents – ORIGINAL</li>
                <li>Photo ID of both parents - ORIGINAL</li>
              </ol>
            </li>
            <li>Rs.500/- to be remitted through Debit/Credit card ONLY towards processing fee.</li>
          </ul>
        </div>
      </PrintPage>
    </div>
  )
}

export default TrackSheetDocument
