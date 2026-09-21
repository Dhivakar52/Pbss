export interface SiblingInfo {
  name: string
  school: string
  usn: string
  classSec: string
  yearLeaving: string
  leftStudent?: string
}

export interface ParentInfo {
  name: string
  dob: string
  isAlumnus: boolean
  yearsStudied: string
  classLastStudied: string
  yearOfLeaving: string
  branch: string
  reasonForLeaving: string
  qualification: string
  university: string
  isEmployed?: boolean
  occupation: string
  employmentCategory: string
  designation: string
  companyName: string
  officeAddress: string
  monthlyIncome: string
  phoneOff: string
  mobileNo: string
}

export interface GuardianInfo {
  isApplicable: boolean
  reason: string
  gender: string
  name: string
  isEmployed: boolean
  occupation: string
  companyName: string
  monthlyIncome: string
  officeAddress: string
  phoneOff: string
  phoneRes: string
  mobileNo: string
}

export interface AddressInfo {
  residentialAddress: string
  pincode: string
  residencePhone: string
  landmark: string
  distanceFromResidence: string
  modeOfTransport: string[]
  parentAchievements: string
  isTransferFromOutside: boolean
}

export interface PhotosData {
  child: string
  father: string
  mother: string
  guardian: string
}

export interface SignaturesData {
  father: string
  mother: string
  guardian: string
}

export interface SubmissionDetails {
  date: string
  timings: string
  branch: string
}

export interface PrintDocumentData {
  registration: {
    registrationNo: string
    branchApplied: string
    dateOfBirth: string
    childName: string
    gender: string
    nationality: string
    community: string
    motherTongue: string
    religion: string
    caste: string
    passportNo: string
    isHealthy: boolean
    majorAilment: string
    childGoesToSchool: boolean
    prevSchool: string
    hasSiblings: boolean
  }
  father: ParentInfo
  mother: ParentInfo
  guardian: GuardianInfo
  address: AddressInfo
  siblings: SiblingInfo[]
  photos: PhotosData
  signatures: SignaturesData
  submission: SubmissionDetails
}
