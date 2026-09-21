export interface ReportFieldConfig {
  key: string
  label: string
  type: 'text' | 'select' | 'date' | 'boolean' | 'number'
  options?: readonly string[] | readonly { value: string; label: string }[]
  span?: 1 | 2
}

export interface ReportConfig {
  id: string
  label: string
  fields: ReportFieldConfig[]
}

// Master Report Fields (exact 83 field list)
export const MASTER_FIELDS: ReportFieldConfig[] = [
  { key: 'application_number', label: 'Application Number', type: 'text' },
  { key: 'student_name', label: 'Student Name', type: 'text' },
  { key: 'dob', label: 'DOB', type: 'date' },
  { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'student_language', label: 'Student Language', type: 'select', options: ['Tamil', 'English', 'Telugu', 'Hindi', 'Malayalam', 'Kannada'] },
  { key: 'nationality', label: 'Nationality', type: 'select', options: ['Indian', 'NRI', 'Foreign National'] },
  { key: 'passport_number', label: 'Passport Number', type: 'text' },
  { key: 'religion', label: 'Religion', type: 'select', options: ['Hindu', 'Christian', 'Muslim', 'Jain', 'Sikh'] },
  { key: 'caste_name', label: 'Caste Name', type: 'text' },
  { key: 'sub_caste_name', label: 'Sub Caste Name', type: 'text' },
  { key: 'playschool_going', label: 'Play School Going', type: 'boolean' },
  { key: 'play_school_name', label: 'Play School Name', type: 'text' },
  { key: 'twin_triplets_flag', label: 'Twin / Triplets Flag', type: 'boolean' },
  { key: 'twin_triplets_count', label: 'Twin / Triplets Count', type: 'number' },
  { key: 'siblings_flag', label: 'Siblings Flag', type: 'boolean' },
  { key: 'physically_challenged', label: 'Physically Challenged', type: 'boolean' },
  { key: 'phy_challenged_remarks', label: 'Physically Challenged Remarks', type: 'text', span: 2 },
  { key: 'date_of_submission', label: 'Date of Submission', type: 'date' },
  { key: 'othterschoolname', label: 'Other School Name', type: 'text' },
  { key: 'usn', label: 'USN', type: 'text' },
  { key: 'sibling_name', label: 'Sibling Name', type: 'text' },
  { key: 'class_and_sec', label: 'Class and Section', type: 'text' },
  { key: 'father_title', label: 'Father Title', type: 'select', options: ['Mr.', 'Dr.', 'Prof.', 'Late'] },
  { key: 'father_name', label: 'Father Name', type: 'text' },
  { key: 'father_name_initial', label: 'Father Initial', type: 'text' },
  { key: 'father_dob', label: 'Father DOB', type: 'date' },
  { key: 'father_alumni_flag', label: 'Father Alumni Flag', type: 'boolean' },
  { key: 'father_total_years_studied', label: 'Father Total Years Studied', type: 'number' },
  { key: 'fatherstudiedclass', label: 'Father Class Last Studied', type: 'text' },
  { key: 'father_passing_year', label: 'Father Passing Year', type: 'text' },
  { key: 'father_leaving_reason', label: 'Father Reason for Leaving', type: 'text' },
  { key: 'father_qualification', label: 'Father Educational Qualification', type: 'text' },
  { key: 'father_instituation_name', label: 'Father University / Institution', type: 'text' },
  { key: 'father_occupation', label: 'Father Occupation', type: 'text' },
  { key: 'father_employment_category_name', label: 'Father Employment Category', type: 'text' },
  { key: 'father_designation', label: 'Father Designation', type: 'text' },
  { key: 'father_company_name', label: 'Father Institution / Company Name', type: 'text' },
  { key: 'father_monthly_income', label: 'Father Monthly Income', type: 'text' },
  { key: 'father_office_address', label: 'Father Office Address', type: 'text', span: 2 },
  { key: 'father_mobile_no', label: 'Father Mobile Number', type: 'text' },
  { key: 'father_phone_number', label: 'Father Office Phone Number', type: 'text' },
  { key: 'mother_title', label: 'Mother Title', type: 'select', options: ['Mrs.', 'Dr.', 'Prof.', 'Ms.', 'Late'] },
  { key: 'mother_name', label: 'Mother Name', type: 'text' },
  { key: 'mother_name_initial', label: 'Mother Initial', type: 'text' },
  { key: 'mother_dob', label: 'Mother DOB', type: 'date' },
  { key: 'mother_alumni_flag', label: 'Mother Alumni Flag', type: 'boolean' },
  { key: 'mother_total_years_studied', label: 'Mother Total Years Studied', type: 'number' },
  { key: 'motherstudiedclass', label: 'Mother Class Last Studied', type: 'text' },
  { key: 'mother_passing_year', label: 'Mother Passing Year', type: 'text' },
  { key: 'mother_leaving_reason', label: 'Mother Reason for Leaving', type: 'text' },
  { key: 'mother_qualification', label: 'Mother Educational Qualification', type: 'text' },
  { key: 'mother_instituation_name', label: 'Mother University / Institution', type: 'text' },
  { key: 'mother_occupation', label: 'Mother Occupation', type: 'text' },
  { key: 'mother_employment_category_name', label: 'Mother Employment Category', type: 'text' },
  { key: 'mother_designation', label: 'Mother Designation', type: 'text' },
  { key: 'mother_company_name', label: 'Mother Institution / Company Name', type: 'text' },
  { key: 'mother_monthly_income', label: 'Mother Monthly Income', type: 'text' },
  { key: 'mother_office_address', label: 'Mother Office Address', type: 'text', span: 2 },
  { key: 'mother_mobile_no', label: 'Mother Mobile Number', type: 'text' },
  { key: 'mother_phone_number', label: 'Mother Office Phone Number', type: 'text' },
  { key: 'guardian_details_flag', label: 'Guardian Details Flag', type: 'boolean' },
  { key: 'guardian_gender', label: 'Guardian Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'guardian_title', label: 'Guardian Title', type: 'select', options: ['Mr.', 'Mrs.', 'Dr.', 'Ms.'] },
  { key: 'guardian_name', label: 'Guardian Name', type: 'text' },
  { key: 'guardian_initial', label: 'Guardian Initial', type: 'text' },
  { key: 'guardian_employment_flag', label: 'Guardian Employment Flag', type: 'boolean' },
  { key: 'guardian_occupation', label: 'Guardian Occupation', type: 'text' },
  { key: 'guardian_instituation_name', label: 'Guardian Institution Name', type: 'text' },
  { key: 'guardian_office_address', label: 'Guardian Office Address', type: 'text', span: 2 },
  { key: 'guardian_office_phone_number', label: 'Guardian Office Phone Number', type: 'text' },
  { key: 'guardian_residence_phone_number', label: 'Guardian Residence Phone Number', type: 'text' },
  { key: 'guardian_email_id', label: 'Guardian Email ID', type: 'text' },
  { key: 'guardian_mobile_number', label: 'Guardian Mobile Number', type: 'text' },
  { key: 'is_parent_coming_on_transfer_from_outside_chennai_or_outside_india', label: 'Is Parent coming on transfer from outside Chennai / India?', type: 'boolean', span: 2 },
  { key: 'from_where', label: 'Transfer From Where', type: 'text' },
  { key: 'parent_acheivements', label: 'Outstanding Achievements of Parents', type: 'text', span: 2 },
  { key: 'landmark', label: 'Important Landmark', type: 'text' },
  { key: 'distance_name', label: 'Distance from Residence', type: 'text' },
  { key: 'vehicle_name', label: 'Mode of Transport', type: 'text' },
  { key: 'address', label: 'Residential Address', type: 'text', span: 2 },
  { key: 'pincode', label: 'Pincode', type: 'text' },
  { key: 'residence_phone_number', label: 'Residence Phone Number', type: 'text' },
]

// General Report Fields (exact 12 backend fields)
export const GENERAL_FIELDS: ReportFieldConfig[] = [
  { key: 'academic_year', label: 'Academic Year', type: 'select', options: ['2025-26', '2024-25'] },
  { key: 'school_applied_for', label: 'School Applied For', type: 'select', options: ['T.Nagar-PSBB', 'KK Nagar-PSBB', 'Nungambakkam-PSBB'] },
  { key: 'application_status', label: 'Application Status', type: 'select', options: ['Declared', 'Approved', 'Pending', 'Draft'] },
  { key: 'registration_number', label: 'Registration Number', type: 'select', options: ['T25-0001', 'T25-0002', 'T25-0003', 'T25-0004', 'T25-0005', 'T25-0006', 'T25-0007', 'T25-0008', 'T25-0009', 'T25-0010'] },
  { key: 'playschool_going', label: 'Child Goes to Play School', type: 'boolean' },
  { key: 'physically_challenged', label: 'Physically Challenged', type: 'boolean' },
  { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'mother_tongue', label: 'Mother Tongue', type: 'select', options: ['Tamil', 'English', 'Telugu', 'Hindi', 'Malayalam', 'Kannada'] },
  { key: 'nationality', label: 'Nationality', type: 'select', options: ['Indian', 'NRI', 'Foreign National'] },
  { key: 'alumni_flag', label: 'Alumni', type: 'boolean' },
  { key: 'religion', label: 'Religion', type: 'select', options: ['Hindu', 'Christian', 'Muslim', 'Jain', 'Sikh'] },
  { key: 'community', label: 'Community', type: 'select', options: ['FC', 'BC', 'MBC', 'SC', 'ST'] },
]

// Alumni Report Fields (exact 83 uppercase/mixed keys)
export const ALUMNI_FIELDS: ReportFieldConfig[] = [
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
  { key: 'PLAYSCHOOL_GOING', label: 'Play School Going', type: 'boolean' },
  { key: 'PLAY_SCHOOL_NAME', label: 'Play School Name', type: 'text' },
  { key: 'TWIN_TRIPLETS_FLAG', label: 'Twin / Triplets Flag', type: 'boolean' },
  { key: 'TWIN_TRIPLETS_COUNT', label: 'Twin / Triplets Count', type: 'number' },
  { key: 'SIBLINGS_FLAG', label: 'Siblings Flag', type: 'boolean' },
  { key: 'PHYSICALLY_CHALLENGED', label: 'Physically Challenged', type: 'boolean' },
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
  { key: 'FATHER_ALUMNI_FLAG', label: 'Father Alumni Flag', type: 'boolean' },
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
  { key: 'MOTHER_ALUMNI_FLAG', label: 'Mother Alumni Flag', type: 'boolean' },
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
  { key: 'GUARDIAN_DETAILS_FLAG', label: 'Guardian Details Flag', type: 'boolean' },
  { key: 'GUARDIAN_GENDER', label: 'Guardian Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'GUARDIAN_TITLE', label: 'Guardian Title', type: 'select', options: ['Mr.', 'Mrs.', 'Dr.', 'Ms.'] },
  { key: 'GUARDIAN_NAME', label: 'Guardian Name', type: 'text' },
  { key: 'GUARDIAN_INITIAL', label: 'Guardian Initial', type: 'text' },
  { key: 'GUARDIAN_EMPLOYMENT_FLAG', label: 'Guardian Employment Flag', type: 'boolean' },
  { key: 'GUARDIAN_OCCUPATION', label: 'Guardian Occupation', type: 'text' },
  { key: 'GUARDIAN_INSTITUATION_NAME', label: 'Guardian Institution Name', type: 'text' },
  { key: 'GUARDIAN_OFFICE_ADDRESS', label: 'Guardian Office Address', type: 'text', span: 2 },
  { key: 'GUARDIAN_OFFICE_PHONE_NUMBER', label: 'Guardian Office Phone Number', type: 'text' },
  { key: 'GUARDIAN_RESIDENCE_PHONE_NUMBER', label: 'Guardian Residence Phone Number', type: 'text' },
  { key: 'GUARDIAN_EMAIL_ID', label: 'Guardian Email ID', type: 'text' },
  { key: 'GUARDIAN_MOBILE_NUMBER', label: 'Guardian Mobile Number', type: 'text' },
  { key: 'IS_PARENT_COMING_ON_TRANSFER_FROM_OUTSIDE_CHENNAI_OR_OUTSIDE_INDIA', label: 'Is Parent coming on transfer from outside Chennai / India?', type: 'boolean', span: 2 },
  { key: 'FROM_WHERE', label: 'Transfer From Where', type: 'text' },
  { key: 'parent_acheivements', label: 'Outstanding Achievements of Parents', type: 'text', span: 2 },
  { key: 'LANDMARK', label: 'Important Landmark', type: 'text' },
  { key: 'DISTANCE_NAME', label: 'Distance from Residence', type: 'text' },
  { key: 'VEHICLE_NAME', label: 'Mode of Transport', type: 'text' },
  { key: 'address', label: 'Residential Address', type: 'text', span: 2 },
  { key: 'PINCODE', label: 'Pincode', type: 'text' },
  { key: 'RESIDENCE_PHONE_NUMBER', label: 'Residence Phone Number', type: 'text' },
]

// Alumni and Sibling Report Fields
export const ALUMNI_SIBLING_FIELDS: ReportFieldConfig[] = [
  { key: 'APPLICATION_NUMBER', label: 'Application Number', type: 'text' },
  { key: 'STUDENT_NAME', label: 'Student Name', type: 'text' },
  { key: 'DOB', label: 'DOB', type: 'date' },
  { key: 'GENDER', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'FATHER_ALUMNI_FLAG', label: 'Father Alumni Flag', type: 'boolean' },
  { key: 'MOTHER_ALUMNI_FLAG', label: 'Mother Alumni Flag', type: 'boolean' },
  { key: 'FATHER_PASSING_YEAR', label: 'Father Passing Year', type: 'text' },
  { key: 'MOTHER_PASSING_YEAR', label: 'Mother Passing Year', type: 'text' },
  { key: 'SIBLINGS_FLAG', label: 'Siblings Flag', type: 'boolean' },
  { key: 'SIBLING_NAME', label: 'Sibling Name', type: 'text' },
  { key: 'CLASS_AND_SEC', label: 'Class and Section', type: 'text' },
  { key: 'USN', label: 'USN', type: 'text' },
  { key: 'FATHER_NAME', label: 'Father Name', type: 'text' },
  { key: 'MOTHER_NAME', label: 'Mother Name', type: 'text' },
  { key: 'FATHER_MOBILE_NO', label: 'Father Mobile Number', type: 'text' },
  { key: 'MOTHER_MOBILE_NO', label: 'Mother Mobile Number', type: 'text' },
]

// Sibling Report Fields
export const SIBLING_FIELDS: ReportFieldConfig[] = [
  { key: 'APPLICATION_NUMBER', label: 'Application Number', type: 'text' },
  { key: 'STUDENT_NAME', label: 'Student Name', type: 'text' },
  { key: 'DOB', label: 'DOB', type: 'date' },
  { key: 'GENDER', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
  { key: 'SIBLINGS_FLAG', label: 'Siblings Flag', type: 'boolean' },
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

// Single Central Configuration Map for the 5 Report Types
export const REPORT_CONFIGS: Record<string, ReportConfig> = {
  master: {
    id: 'master',
    label: 'Master (KK Nagar and T Nagar)',
    fields: MASTER_FIELDS,
  },
  general: {
    id: 'general',
    label: 'General',
    fields: GENERAL_FIELDS,
  },
  alumni: {
    id: 'alumni',
    label: 'Alumni Report',
    fields: ALUMNI_FIELDS,
  },
  alumniSibling: {
    id: 'alumniSibling',
    label: 'Alumni and Sibling Report',
    fields: ALUMNI_SIBLING_FIELDS,
  },
  sibling: {
    id: 'sibling',
    label: 'Sibling Report',
    fields: SIBLING_FIELDS,
  },
}

// Allowed 5 Report Type Display Options
export const ALLOWED_REPORT_TYPES: { value: string; label: string; key: string }[] = [
  { value: 'Master (KK Nagar and T Nagar)', label: 'Master (KK Nagar and T Nagar)', key: 'master' },
  { value: 'General', label: 'General', key: 'general' },
  { value: 'Alumni Report', label: 'Alumni Report', key: 'alumni' },
  { value: 'Alumni and Sibling Report', label: 'Alumni and Sibling Report', key: 'alumniSibling' },
  { value: 'Sibling Report', label: 'Sibling Report', key: 'sibling' },
]

// Helper function to resolve report configuration from label or key
export function getReportConfig(reportLabelOrKey: string): ReportConfig {
  const matched = ALLOWED_REPORT_TYPES.find(
    (r) =>
      r.value.toLowerCase() === reportLabelOrKey.toLowerCase() ||
      r.key.toLowerCase() === reportLabelOrKey.toLowerCase() ||
      (r.key === 'master' && reportLabelOrKey.toLowerCase().includes('master'))
  )
  if (matched && REPORT_CONFIGS[matched.key]) {
    return REPORT_CONFIGS[matched.key]
  }
  return REPORT_CONFIGS.alumni // Default fallback
}
