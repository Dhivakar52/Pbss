export interface ReportField {
  key: string
  label: string
  type: 'text' | 'select' | 'date' | 'number'
  options?: readonly string[] | readonly { value: string; label: string }[]
  span?: 1 | 2
}

export const ALUMNI_REPORT_FIELDS: ReportField[] = [
  { key: 'APPLICATION_NUMBER', label: 'Application Number', type: 'text' },
  { key: 'STUDENT_NAME', label: 'Student Name', type: 'text' },
  { key: 'DOB', label: 'DOB', type: 'date' },
  { key: 'GENDER', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'STUDENT_LANGUAGE', label: 'Student Language', type: 'select', options: ['Tamil', 'English', 'Telugu', 'Hindi', 'Malayalam', 'Kannada'] },
  { key: 'NATIONALITY', label: 'Nationality', type: 'select', options: ['Indian', 'NRI', 'Foreign National'] },
  { key: 'PASSPORT_NUMBER', label: 'Passport Number', type: 'text' },
  { key: 'RELIGION', label: 'Religion', type: 'select', options: ['Hindu', 'Christian', 'Muslim', 'Jain', 'Sikh'] },
  { key: 'CASTE_NAME', label: 'Caste Name', type: 'text' },
  { key: 'SUB_CASTE_NAME', label: 'Sub Caste Name', type: 'text' },
  { key: 'PLAYSCHOOL_GOING', label: 'Play School Going', type: 'select', options: ['Yes', 'No'] },
  { key: 'PLAY_SCHOOL_NAME', label: 'Play School Name', type: 'text' },
  { key: 'TWIN_TRIPLETS_FLAG', label: 'Twin / Triplets Flag', type: 'select', options: ['Yes', 'No'] },
  { key: 'TWIN_TRIPLETS_COUNT', label: 'Twin / Triplets Count', type: 'number' },
  { key: 'SIBLINGS_FLAG', label: 'Siblings Flag', type: 'select', options: ['Yes', 'No'] },
  { key: 'PHYSICALLY_CHALLENGED', label: 'Physically Challenged', type: 'select', options: ['Yes', 'No'] },
  { key: 'PHY_CHALLENGED_REMARKS', label: 'Physically Challenged Remarks', type: 'text', span: 2 },
  { key: 'DATE_OF_SUBMISSION', label: 'Date of Submission', type: 'date' },
  { key: 'OTHTERSCHOOLNAME', label: 'Other School Name', type: 'text' },
  { key: 'USN', label: 'USN', type: 'text' },
  { key: 'SIBLING_NAME', label: 'Sibling Name', type: 'text' },
  { key: 'CLASS_AND_SEC', label: 'Class and Section', type: 'text' },
  { key: 'FATHER_TITLE', label: 'Father Title', type: 'select', options: ['Mr.', 'Dr.', 'Prof.', 'Late'] },
  { key: 'FATHER_NAME', label: 'Father Name', type: 'text' },
  { key: 'FATHER_NAME_INITIAL', label: 'Father Initial', type: 'text' },
  { key: 'FATHER_DOB', label: 'Father DOB', type: 'date' },
  { key: 'FATHER_ALUMNI_FLAG', label: 'Father Alumni Flag', type: 'select', options: ['Yes', 'No'] },
  { key: 'FATHER_TOTAL_YEARS_STUDIED', label: 'Father Total Years Studied', type: 'number' },
  { key: 'FATHERSTUDIEDCLASS', label: 'Father Class Last Studied', type: 'text' },
  { key: 'FATHER_PASSING_YEAR', label: 'Father Passing Year', type: 'text' },
  { key: 'FATHER_LEAVING_REASON', label: 'Father Reason for Leaving', type: 'text' },
  { key: 'FATHER_QUALIFICATION', label: 'Father Educational Qualification', type: 'text' },
  { key: 'FATHER_INSTITUATION_NAME', label: 'Father University / Institution', type: 'text' },
  { key: 'FATHER_OCCUPATION', label: 'Father Occupation', type: 'text' },
  { key: 'FATHER_EMPLOYMENT_CATEGORY_NAME', label: 'Father Employment Category', type: 'text' },
  { key: 'FATHER_DESIGNATION', label: 'Father Designation', type: 'text' },
  { key: 'FATHER_COMPANY_NAME', label: 'Father Institution / Company Name', type: 'text' },
  { key: 'FATHER_MONTHLY_INCOME', label: 'Father Monthly Income', type: 'text' },
  { key: 'FATHER_OFFICE_ADDRESS', label: 'Father Office Address', type: 'text', span: 2 },
  { key: 'FATHER_MOBILE_NO', label: 'Father Mobile Number', type: 'text' },
  { key: 'FATHER_PHONE_NUMBER', label: 'Father Office Phone Number', type: 'text' },
  { key: 'MOTHER_TITLE', label: 'Mother Title', type: 'select', options: ['Mrs.', 'Dr.', 'Prof.', 'Ms.', 'Late'] },
  { key: 'MOTHER_NAME', label: 'Mother Name', type: 'text' },
  { key: 'MOTHER_NAME_INITIAL', label: 'Mother Initial', type: 'text' },
  { key: 'MOTHER_DOB', label: 'Mother DOB', type: 'date' },
  { key: 'MOTHER_ALUMNI_FLAG', label: 'Mother Alumni Flag', type: 'select', options: ['Yes', 'No'] },
  { key: 'MOTHER_TOTAL_YEARS_STUDIED', label: 'Mother Total Years Studied', type: 'number' },
  { key: 'MOTHERSTUDIEDCLASS', label: 'Mother Class Last Studied', type: 'text' },
  { key: 'MOTHER_PASSING_YEAR', label: 'Mother Passing Year', type: 'text' },
  { key: 'MOTHER_LEAVING_REASON', label: 'Mother Reason for Leaving', type: 'text' },
  { key: 'MOTHER_QUALIFICATION', label: 'Mother Educational Qualification', type: 'text' },
  { key: 'MOTHER_INSTITUATION_NAME', label: 'Mother University / Institution', type: 'text' },
  { key: 'MOTHER_OCCUPATION', label: 'Mother Occupation', type: 'text' },
  { key: 'MOTHER_EMPLOYMENT_CATEGORY_NAME', label: 'Mother Employment Category', type: 'text' },
  { key: 'MOTHER_DESIGNATION', label: 'Mother Designation', type: 'text' },
  { key: 'MOTHER_COMPANY_NAME', label: 'Mother Institution / Company Name', type: 'text' },
  { key: 'MOTHER_MONTHLY_INCOME', label: 'Mother Monthly Income', type: 'text' },
  { key: 'MOTHER_OFFICE_ADDRESS', label: 'Mother Office Address', type: 'text', span: 2 },
  { key: 'MOTHER_MOBILE_NO', label: 'Mother Mobile Number', type: 'text' },
  { key: 'MOTHER_PHONE_NUMBER', label: 'Mother Office Phone Number', type: 'text' },
  { key: 'GUARDIAN_DETAILS_FLAG', label: 'Guardian Details Flag', type: 'select', options: ['Yes', 'No'] },
  { key: 'GUARDIAN_GENDER', label: 'Guardian Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'GUARDIAN_TITLE', label: 'Guardian Title', type: 'select', options: ['Mr.', 'Mrs.', 'Dr.', 'Ms.'] },
  { key: 'GUARDIAN_NAME', label: 'Guardian Name', type: 'text' },
  { key: 'GUARDIAN_INITIAL', label: 'Guardian Initial', type: 'text' },
  { key: 'GUARDIAN_EMPLOYMENT_FLAG', label: 'Guardian Employment Flag', type: 'select', options: ['Yes', 'No'] },
  { key: 'GUARDIAN_OCCUPATION', label: 'Guardian Occupation', type: 'text' },
  { key: 'GUARDIAN_INSTITUATION_NAME', label: 'Guardian Institution Name', type: 'text' },
  { key: 'GUARDIAN_OFFICE_ADDRESS', label: 'Guardian Office Address', type: 'text', span: 2 },
  { key: 'GUARDIAN_OFFICE_PHONE_NUMBER', label: 'Guardian Office Phone Number', type: 'text' },
  { key: 'GUARDIAN_RESIDENCE_PHONE_NUMBER', label: 'Guardian Residence Phone Number', type: 'text' },
  { key: 'GUARDIAN_EMAIL_ID', label: 'Guardian Email ID', type: 'text' },
  { key: 'GUARDIAN_MOBILE_NUMBER', label: 'Guardian Mobile Number', type: 'text' },
  { key: 'IS_PARENT_COMING_ON_TRANSFER_FROM_OUTSIDE_CHENNAI_OR_OUTSIDE_INDIA', label: 'Is Parent coming on transfer from outside Chennai / India?', type: 'select', options: ['Yes', 'No'], span: 2 },
  { key: 'FROM_WHERE', label: 'Transfer From Where', type: 'text' },
  { key: 'parent_acheivements', label: 'Outstanding Achievements of Parents', type: 'text', span: 2 },
  { key: 'LANDMARK', label: 'Important Landmark', type: 'text' },
  { key: 'DISTANCE_NAME', label: 'Distance from Residence', type: 'text' },
  { key: 'VEHICLE_NAME', label: 'Mode of Transport', type: 'text' },
  { key: 'address', label: 'Residential Address', type: 'text', span: 2 },
  { key: 'PINCODE', label: 'Pincode', type: 'text' },
  { key: 'RESIDENCE_PHONE_NUMBER', label: 'Residence Phone Number', type: 'text' },
]

export const SIBLING_REPORT_FIELDS: ReportField[] = [
  { key: 'APPLICATION_NUMBER', label: 'Application Number', type: 'text' },
  { key: 'STUDENT_NAME', label: 'Student Name', type: 'text' },
  { key: 'DOB', label: 'DOB', type: 'date' },
  { key: 'GENDER', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'SIBLINGS_FLAG', label: 'Siblings Flag', type: 'select', options: ['Yes', 'No'] },
  { key: 'SIBLING_NAME', label: 'Sibling Name', type: 'text' },
  { key: 'CLASS_AND_SEC', label: 'Class and Section', type: 'text' },
  { key: 'USN', label: 'USN', type: 'text' },
  { key: 'SCHOOL_NAME', label: 'Name of the School', type: 'text' },
  { key: 'YEAR_OF_LEAVING', label: 'Year & Class of Leaving', type: 'text' },
  { key: 'FATHER_NAME', label: 'Father Name', type: 'text' },
  { key: 'MOTHER_NAME', label: 'Mother Name', type: 'text' },
  { key: 'FATHER_MOBILE_NO', label: 'Father Mobile Number', type: 'text' },
  { key: 'MOTHER_MOBILE_NO', label: 'Mother Mobile Number', type: 'text' },
]

export const ALUMNI_SIBLING_REPORT_FIELDS: ReportField[] = [
  { key: 'APPLICATION_NUMBER', label: 'Application Number', type: 'text' },
  { key: 'STUDENT_NAME', label: 'Student Name', type: 'text' },
  { key: 'DOB', label: 'DOB', type: 'date' },
  { key: 'GENDER', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'FATHER_ALUMNI_FLAG', label: 'Father Alumni Flag', type: 'select', options: ['Yes', 'No'] },
  { key: 'MOTHER_ALUMNI_FLAG', label: 'Mother Alumni Flag', type: 'select', options: ['Yes', 'No'] },
  { key: 'FATHER_PASSING_YEAR', label: 'Father Passing Year', type: 'text' },
  { key: 'MOTHER_PASSING_YEAR', label: 'Mother Passing Year', type: 'text' },
  { key: 'SIBLINGS_FLAG', label: 'Siblings Flag', type: 'select', options: ['Yes', 'No'] },
  { key: 'SIBLING_NAME', label: 'Sibling Name', type: 'text' },
  { key: 'CLASS_AND_SEC', label: 'Class and Section', type: 'text' },
  { key: 'USN', label: 'USN', type: 'text' },
  { key: 'FATHER_NAME', label: 'Father Name', type: 'text' },
  { key: 'MOTHER_NAME', label: 'Mother Name', type: 'text' },
  { key: 'FATHER_MOBILE_NO', label: 'Father Mobile Number', type: 'text' },
  { key: 'MOTHER_MOBILE_NO', label: 'Mother Mobile Number', type: 'text' },
]

export const GENERAL_REPORT_FIELDS: ReportField[] = [
  { key: 'ACADEMIC_YEAR', label: 'Academic Year', type: 'select', options: ['2025-26', '2024-25'] },
  { key: 'SCHOOL_APPLIED_FOR', label: 'School Applied For', type: 'select', options: ['T.Nagar-PSBB', 'KK Nagar-PSBB', 'Nungambakkam-PSBB'] },
  { key: 'APPLICATION_STATUS', label: 'Application Status', type: 'select', options: ['Declared', 'Approved', 'Pending', 'Draft'] },
  { key: 'REGISTRATION_NUMBER', label: 'Registration Number', type: 'select', options: ['T25-0001', 'T25-0002', 'T25-0003', 'T25-0004', 'T25-0005', 'T25-0006', 'T25-0007', 'T25-0008', 'T25-0009', 'T25-0010'] },
  { key: 'PLAYSCHOOL_GOING', label: 'Child Goes to Play School', type: 'select', options: ['Yes', 'No'] },
  { key: 'PHYSICALLY_CHALLENGED', label: 'Physically Challenged', type: 'select', options: ['Yes', 'No'] },
  { key: 'GENDER', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'MOTHER_TONGUE', label: 'Mother Tongue', type: 'select', options: ['Tamil', 'English', 'Telugu', 'Hindi', 'Malayalam', 'Kannada'] },
  { key: 'NATIONALITY', label: 'Nationality', type: 'select', options: ['Indian', 'NRI', 'Foreign National'] },
  { key: 'ALUMNI_FLAG', label: 'Alumni', type: 'select', options: ['Yes', 'No'] },
  { key: 'RELIGION', label: 'Religion', type: 'select', options: ['Hindu', 'Christian', 'Muslim', 'Jain', 'Sikh'] },
  { key: 'COMMUNITY', label: 'Community', type: 'select', options: ['FC', 'BC', 'MBC', 'SC', 'ST'] },
]

export function getReportFields(reportType: string): ReportField[] {
  switch (reportType) {
    case 'Alumni Report':
      return ALUMNI_REPORT_FIELDS
    case 'Sibling Report':
      return SIBLING_REPORT_FIELDS
    case 'Alumni and Sibling Report':
      return ALUMNI_SIBLING_REPORT_FIELDS
    case 'General':
    case 'General Report':
    case 'Detailed Report':
    case 'Application Summary':
    case 'Branch-wise Report':
    case 'Status Report':
      return GENERAL_REPORT_FIELDS
    default:
      return GENERAL_REPORT_FIELDS
  }
}
