import React from 'react'
import type { PrintDocumentData } from '@/types/printTypes'
import { PrintPage } from './print/PrintPage'

interface Props {
  data: PrintDocumentData
}

export const RegistrationFormDocument: React.FC<Props> = ({ data }) => {
  const reg = data.registration
  const father = data.father
  const mother = data.mother
  const guardian = data.guardian
  const addr = data.address

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

  const documentTitle = 'Registration Form for Pre KG 2024-25'

  return (
    <div className="pbss-print-wrapper bg-white text-black text-[12.5px] leading-snug font-sans">
      {/* ==========================================
         PAGE 1 OF 3 - REGISTRATION FORM
         ========================================== */}
      <PrintPage
        documentTitle={documentTitle}
        registrationNo={regNo}
        childName={childName}
        showSidebar={true}
        showRegFooter={true}
      >
        <div className="space-y-2">
          {/* Top Key Fields */}
          <div className="space-y-2">
            {/* Row 1: Reg No & School Applied For */}
            <div className="flex items-baseline justify-between text-[12.5px]">
              <div className="flex items-center gap-2">
                <span className="font-bold w-[160px]">Registration No.</span>
                <span className="font-bold mr-1">:</span>
                <div className="border border-black px-3 py-0.5 min-w-[120px] h-[24px] inline-flex items-center text-[12.5px] font-normal">
                  {regNo}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">School Applied For :</span>
                <span className="font-normal">{reg.branchApplied || 'T.NAGAR-PSBB'}</span>
              </div>
            </div>

            {/* Row 2: Name of the Child */}
            <div className="flex items-baseline text-[12.5px]">
              <span className="font-bold w-[160px]">Name of the Child</span>
              <span className="font-bold mr-3">:</span>
              <span className="font-normal flex-1 border-b border-dotted border-gray-300 min-h-[18px]">
                {childName}
              </span>
            </div>

            {/* Row 3: Date of Birth & Passport No */}
            <div className="grid grid-cols-12 gap-2 text-[12.5px] items-baseline">
              <div className="col-span-7 flex items-baseline">
                <span className="font-bold w-[160px]">Date of Birth</span>
                <span className="font-bold mr-3">:</span>
                <span className="font-normal flex-1">{reg.dateOfBirth}</span>
              </div>
              <div className="col-span-5 flex items-baseline justify-end">
                <span className="font-bold mr-2">Passport No :</span>
                <span className="font-normal min-w-[90px]">{reg.passportNo}</span>
              </div>
            </div>

            {/* Row 4: Mother Tongue */}
            <div className="flex items-baseline text-[12.5px]">
              <span className="font-bold w-[160px]">Mother Tongue</span>
              <span className="font-bold mr-3">:</span>
              <span className="font-normal">{reg.motherTongue}</span>
            </div>

            {/* Row 5: Religion & Caste */}
            <div className="grid grid-cols-12 gap-2 text-[12.5px] items-baseline">
              <div className="col-span-7 flex items-baseline">
                <span className="font-bold w-[160px]">Religion</span>
                <span className="font-bold mr-3">:</span>
                <span className="font-normal">{reg.religion}</span>
              </div>
              <div className="col-span-5 flex items-baseline justify-end">
                <span className="font-bold mr-2">Caste :</span>
                <span className="font-normal min-w-[90px]">{reg.caste}</span>
              </div>
            </div>

            {/* Row 6: Nationality & Gender */}
            <div className="grid grid-cols-12 gap-2 text-[12.5px] items-baseline">
              <div className="col-span-7 flex items-baseline">
                <span className="font-bold w-[160px]">Nationality</span>
                <span className="font-bold mr-3">:</span>
                <span className="font-normal">{reg.nationality}</span>
              </div>
              <div className="col-span-5 flex items-baseline justify-end">
                <span className="font-bold mr-2">Gender :</span>
                <span className="font-normal min-w-[90px]">{reg.gender}</span>
              </div>
            </div>

            {/* Row 7: Community & Play school */}
            <div className="grid grid-cols-12 gap-2 text-[12.5px] items-baseline">
              <div className="col-span-6 flex items-baseline">
                <span className="font-bold w-[160px]">Community</span>
                <span className="font-bold mr-3">:</span>
                <span className="font-normal">{reg.community}</span>
              </div>
              <div className="col-span-6 flex items-baseline justify-end">
                <span className="font-bold leading-tight text-right mr-2">
                  Does the Child go<br />to any play school?
                </span>
                <span className="font-bold mr-2">:</span>
                <span className="font-normal min-w-[40px]">{formatBool(reg.childGoesToSchool)}</span>
              </div>
            </div>

            {/* Row 8: If yes, Play School Name */}
            <div className="flex items-baseline text-[12.5px]">
              <span className="font-bold w-[160px] leading-tight">If yes, Play<br />School Name</span>
              <span className="font-bold mr-3 self-center">:</span>
              <span className="font-normal flex-1">{reg.prevSchool}</span>
            </div>

            {/* Row 9: Twins/Triplets */}
            <div className="flex items-baseline text-[12.5px]">
              <span className="font-bold w-[320px]">Is the child One of Twins/Triplets/Quadruplets</span>
              <span className="font-bold mr-3">:</span>
              <span className="font-normal"></span>
            </div>

            {/* Row 10: Does the child have any school going Siblings? */}
            <div className="flex items-baseline text-[12.5px]">
              <span className="font-bold w-[320px]">Does the child have any school going Siblings?</span>
              <span className="font-bold mr-3">:</span>
              <span className="font-normal">{formatBool(reg.hasSiblings)}</span>
            </div>
          </div>

          {/* Siblings Table */}
          <div className="my-2">
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

          {/* Health Info */}
          <div className="space-y-1.5 text-[12.5px]">
            <div className="flex items-baseline">
              <span className="font-bold w-[320px]">Is the Child a normal and healthy Child</span>
              <span className="font-bold mr-3">:</span>
              <span className="font-normal">{formatBool(reg.isHealthy)}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[320px] leading-tight">
                Specify Major<br />ailment, If any :<br /><span className="font-normal">(Past/Present)</span>
              </span>
              <span className="font-normal flex-1 ml-3">{reg.majorAilment}</span>
            </div>
          </div>

          {/* Parent Names & DOB */}
          <div className="space-y-2 pt-1 text-[12.5px]">
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
                <span className="font-bold w-[130px]">Father’s DOB :</span>
                <span className="font-normal flex-1">{father.dob}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-bold w-[130px]">Mother’s DOB :</span>
                <span className="font-normal flex-1">{mother.dob}</span>
              </div>
            </div>
          </div>
        </div>
      </PrintPage>

      {/* ==========================================
         PAGE 2 OF 3 - REGISTRATION FORM
         ========================================== */}
      <PrintPage
        documentTitle={documentTitle}
        registrationNo={regNo}
        childName={childName}
        showSidebar={true}
        showRegFooter={true}
      >
        <div className="space-y-2 text-[12px]">
          {/* Two-Column Grid for Father vs Mother Details */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Is Father an Alumnus</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{formatBool(father.isAlumnus)}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Is Mother an Alumnus</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{formatBool(mother.isAlumnus)}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Total No of Years Studied</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.yearsStudied}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Total No of Years Studied</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.yearsStudied}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Class Last Studied</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.classLastStudied}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Class Last Studied</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.classLastStudied}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Year of leaving / Passing</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.yearOfLeaving}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Year of leaving / Passing</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.yearOfLeaving}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Branch</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.branch}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Branch</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.branch}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Reason of Leaving</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.reasonForLeaving}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Reason of Leaving</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.reasonForLeaving}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Father's Educational<br />Qualification</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{father.qualification}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Mother's Educational<br />Qualification</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{mother.qualification}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">University/Institution</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.university}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">University/Institution</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.university}</span>
            </div>

            <div></div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Is Mother Employed?</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{formatBool(mother.isEmployed)}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Father's<br />Occupation</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{father.occupation}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Mother's<br />Occupation</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{mother.occupation}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Father's<br />Employment<br />Category</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{father.employmentCategory}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Mother's<br />Employment<br />Category</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{mother.employmentCategory}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Father’s<br />Designation</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{father.designation}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Mother’s<br />Designation</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{mother.designation}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Institution<br />/Company<br />Name</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{father.companyName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Institution<br />/Company<br />Name</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{mother.companyName}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Father’s Office<br />Address</span>
              <span className="font-bold mr-2 self-start">:</span>
              <span className="font-normal self-start">{father.officeAddress}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px] leading-tight">Mother’s Office<br />Address</span>
              <span className="font-bold mr-2 self-start">:</span>
              <span className="font-normal self-start">{mother.officeAddress}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Father’s Income</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.monthlyIncome}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Mother’s Income</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.monthlyIncome}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Father’s Ph. No-Off</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.phoneOff}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Mother’s Ph. No-Off</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.phoneOff}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Father’s Mobile No</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{father.mobileNo}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Mother’s Mobile No</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{mother.mobileNo}</span>
            </div>
          </div>

          {/* Guardian Name */}
          <div className="pt-1">
            <div className="flex items-baseline">
              <span className="font-bold w-[180px]">Guardian's Name</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{guardian.name}</span>
            </div>
          </div>
        </div>
      </PrintPage>

      {/* ==========================================
         PAGE 3 OF 3 - REGISTRATION FORM
         ========================================== */}
      <PrintPage
        documentTitle={documentTitle}
        registrationNo={regNo}
        childName={childName}
        showSidebar={true}
        showRegFooter={true}
      >
        <div className="space-y-2 text-[11.5px] leading-snug">
          {/* Guardian & Transport Details */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Guardian’s Gender</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{guardian.gender}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[150px]">Occupation :</span>
              <span className="font-normal">{guardian.occupation}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[170px] leading-tight">Institution / Company<br />Name</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{guardian.companyName}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[150px] self-center">Monthly Income:</span>
              <span className="font-normal self-center">{guardian.monthlyIncome}</span>
            </div>

            <div className="col-span-2 flex items-baseline">
              <span className="font-bold w-[170px]">Office Address</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal flex-1">{guardian.officeAddress}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Guardian's Ph. No-Off</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{guardian.phoneOff}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[170px]">Guardian's Ph. No-Res</span>
              <span className="font-bold mr-2">:</span>
              <span className="font-normal">{guardian.phoneRes}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[170px] leading-tight">Guardian's Mobile<br />Number</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{guardian.mobileNo}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[170px] leading-tight self-center">Residence Telephone No</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{addr.residencePhone}</span>
            </div>

            <div className="col-span-2 flex items-baseline">
              <span className="font-bold w-[170px] leading-tight">Residential<br />Address</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal flex-1 self-center">{addr.residentialAddress}</span>
            </div>

            <div className="col-span-2 flex items-baseline">
              <span className="font-bold w-[170px] leading-tight">Important<br />land mark</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal flex-1 self-center">{addr.landmark}</span>
            </div>

            <div className="flex items-baseline">
              <span className="font-bold w-[170px] leading-tight">Distance from<br />Residence</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{addr.distanceFromResidence}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-bold w-[150px] self-center">Mode of Transport</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{addr.modeOfTransport?.join(', ')}</span>
            </div>

            <div className="col-span-2 flex items-baseline">
              <span className="font-bold w-[170px] leading-tight">Outstanding achievements<br />of parents</span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal flex-1 self-center">{addr.parentAchievements}</span>
            </div>

            <div className="col-span-2 flex items-baseline">
              <span className="font-bold w-[260px] leading-tight">
                Is the Parent coming on<br />transfer<br />from outside Chennai/from<br />outside India
              </span>
              <span className="font-bold mr-2 self-center">:</span>
              <span className="font-normal self-center">{formatBool(addr.isTransferFromOutside)}</span>
            </div>
          </div>

          {/* Solemn Declaration Block */}
          <div className="pt-1 text-[11.5px] leading-snug">
            <p className="text-justify font-normal">
              We, the parents (father & mother)/guardian of{' '}
              <span className="font-bold underline px-1">{childName || '__________________________________'}</span>{' '}
              seeking his / her admission to Pre KG hereby solemnly declare that the information furnished above is
              absolutely true and that if found factually wrong at any time after the admission during his / her stay in
              school, We shall abide by the orders of the school for withdrawal of our son/ daughter/ward without any
              plea or protest. We also understand and accept that submission of online registration form and track sheet
              does not guarantee admission.
            </p>
          </div>

          {/* Date & Signatures */}
          <div className="pt-1 text-[11.5px]">
            <div className="flex justify-between items-start">
              <div className="flex items-baseline">
                <span className="font-bold">Date :</span>
                <span className="ml-2 font-normal">{data.submission?.date || ''}</span>
              </div>
              <div className="text-right space-y-0.5">
                <p className="font-bold">Signature of the Parent / Guardian</p>
                <p className="font-bold text-[11px] pt-2">Name in BLOCK LETTER :</p>
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div className="pt-0.5 text-[10.5px] leading-tight space-y-0.5">
            <p className="font-bold text-[11px]">Note :</p>
            <ul className="list-disc pl-4 space-y-0.5 font-normal text-black">
              <li>Forms with False/ Incomplete/Vague information will not be considered.</li>
              <li>Submit the Track Sheet signed by both parents (to the school office of the branch applied for)</li>
              <li>
                Documents to be submitted in person by the parent only (with authorization letter from parent, if guardian):
                <ol className="list-decimal pl-5 pt-0.5 space-y-0.5">
                  <li>
                    Track sheet signed by BOTH parents/guardian with recent photo of the child duly affixed
                    <br />
                    <span className="text-[9.5px]">(please mention Reg No. at the back of the photo)</span>
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
        </div>
      </PrintPage>
    </div>
  )
}

export default RegistrationFormDocument
