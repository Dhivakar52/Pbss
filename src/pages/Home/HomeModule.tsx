import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/toast'
import type {
    Step,
    Sibling,
    FatherDetailsState,
    MotherDetailsState,
    GuardianDetailsState,
    CommunicationDetailsState
} from './types'
import { RegistrationOverview } from './components/RegistrationOverview'
import { StepSidebar } from './components/StepSidebar'
import { Step1ApplicantDetails } from './steps/Step1ApplicantDetails'
import { Step2ParentDetails } from './steps/Step2ParentDetails'
import { Step3GuardianDetails } from './steps/Step3GuardianDetails'
import { Step4CommunicationDetails } from './steps/Step4CommunicationDetails'
import { Step5Declaration } from './steps/Step5Declaration'
import { RegistrationSuccessModal } from './components/RegistrationSuccessModal'

const stepSlugMap: Record<string, number> = {
    'application-details': 1,
    'applicant-details': 1,
    'parent-details': 2,
    'guardian-details': 3,
    'communication-details': 4,
    'declaration': 5,
}

const stepIdToSlug: Record<number, string> = {
    1: 'application-details',
    2: 'parent-details',
    3: 'guardian-details',
    4: 'communication-details',
    5: 'declaration',
}

export default function HomeModule() {
    const { stepSlug } = useParams<{ stepSlug?: string }>()
    const navigate = useNavigate()

    const [viewMode, setViewMode] = useState<'overview' | 'stepForm'>('overview')
    const [activeStepId, setActiveStepId] = useState<number>(1)
    const [completedStepIds, setCompletedStepIds] = useState<number[]>([])

    // Check if coming from Admin section
    const [fromAdmin, setFromAdmin] = useState<boolean>(() => {
        return localStorage.getItem("fromAdmin") === "true" || localStorage.getItem("navigationSource") === "admin-students"
    })

    useEffect(() => {
        if (stepSlug && stepSlugMap[stepSlug]) {
            setViewMode('stepForm')
            setActiveStepId(stepSlugMap[stepSlug])
        } else {
            setViewMode('overview')
        }
    }, [stepSlug])

    // Pre-fill state when editing a student record from Admin table
    useEffect(() => {
        try {
            const storedAdmin = localStorage.getItem("fromAdmin")
            const storedSource = localStorage.getItem("navigationSource")
            const stored = localStorage.getItem("editingStudent")

            if (storedAdmin === "true" || storedSource === "admin-students" || stored) {
                setFromAdmin(true)
                localStorage.setItem("fromAdmin", "true")
            }

            if (stored) {
                const s = JSON.parse(stored)
                if (s && s.studentName) {
                    setChildName(s.studentName || '')
                    setGender(s.gender || '')
                    setMotherTongue(s.motherTongue || '')
                    setReligion(s.religion || '')
                    setCaste(s.caste || '')
                    setCommunity(s.community || '')
                    setDob(s.date || '2022-01-15')
                    setFather((prev) => ({
                        ...prev,
                        name: s.fatherName || '',
                        mobileNo: s.mobile || '',
                        monthlyIncome: s.incomeRange || '',
                        isAlumnus: s.alumni || false,
                    }))
                    setMother((prev) => ({
                        ...prev,
                        name: s.motherName || '',
                    }))
                    setComm((prev) => ({
                        ...prev,
                        address: `${s.area}, ${s.city}`,
                        distanceKm: s.distanceKm || '',
                    }))
                    toast.info(`Pre-filled registration data for ${s.studentName} (${s.registrationNumber})`)
                }
                localStorage.removeItem("editingStudent")
            }
        } catch (err) {
            console.error('Error loading editing student data:', err)
        }
    }, [])

    // Success Modal State
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)
    const [applicationNo] = useState<string>('T25-0003')

    // Step 1 Form States (Applicant Details) - Empty Initial State
    const [childName, setChildName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [motherTongue, setMotherTongue] = useState('')
    const [nationality, setNationality] = useState('Indian')
    const [religion, setReligion] = useState('')
    const [caste, setCaste] = useState('')
    const [community, setCommunity] = useState('')
    const [isHealthy, setIsHealthy] = useState<boolean>(true)
    const [majorAilment, setMajorAilment] = useState('')
    const [childGoesToSchool, setChildGoesToSchool] = useState<boolean>(false)
    const [prevSchool, setPrevSchool] = useState('')
    const [hasSiblings, setHasSiblings] = useState<boolean>(false)
    const [siblings, setSiblings] = useState<Sibling[]>([])

    // Step 2 Form States (Parent Details) - Empty Initial State
    const [father, setFather] = useState<FatherDetailsState>({
        title: '',
        initials: '',
        name: '',
        dob: '',
        isAlumnus: false,
        yearsStudied: '',
        classLastStudied: '',
        yearOfLeaving: '',
        branch: '',
        reasonForLeaving: '',
        qualification: '',
        university: '',
        occupation: '',
        employmentCategory: '',
        designation: '',
        companyName: '',
        officeAddress: '',
        monthlyIncome: '',
        phoneOff: '',
        mobileNo: '',
    })

    const [mother, setMother] = useState<MotherDetailsState>({
        title: '',
        initials: '',
        name: '',
        dob: '',
        isAlumnus: false,
        yearsStudied: '',
        classLastStudied: '',
        yearOfLeaving: '',
        branch: '',
        reasonForLeaving: '',
        qualification: '',
        university: '',
        isEmployed: false,
        occupation: '',
        employmentCategory: '',
        designation: '',
        companyName: '',
        officeAddress: '',
        monthlyIncome: '',
        phoneOff: '',
        mobileNo: '',
    })

    // Step 3 Form States (Guardian Details) - Empty Initial State
    const [guardian, setGuardian] = useState<GuardianDetailsState>({
        isApplicable: false,
        reason: '',
        gender: '',
        title: '',
        initials: '',
        name: '',
        isEmployed: false,
        occupation: '',
        companyName: '',
        monthlyIncome: '',
        officeAddress: '',
        phoneOff: '',
        phoneRes: '',
        mobileNo: '',
    })

    // Step 4 Form States (Communication & Other Details) - Empty Initial State
    const [comm, setComm] = useState<CommunicationDetailsState>({
        address: '',
        pincode: '',
        residencePhone: '',
        landmark: '',
        distanceKm: '',
        commuteMode: [],
        parentAchievements: '',
        isTransferFromOutside: false,
    })

    // Step 5 Form States (Declaration) - Empty Initial State
    const [declarantType, setDeclarantType] = useState<'Father' | 'Mother' | 'Guardian'>('Father')
    const [isDeclared, setIsDeclared] = useState(false)

    const rawSteps: Omit<Step, 'status'>[] = [
        { id: 1, title: 'Applicant Details', hasSubChevron: true },
        { id: 2, title: 'Parent Details', hasSubChevron: false },
        { id: 3, title: 'Guardian Details', hasSubChevron: false },
        { id: 4, title: 'Communication and Other Details', hasSubChevron: true },
        { id: 5, title: 'Declaration', hasSubChevron: true },
    ]

    const steps: Step[] = rawSteps.map((step) => {
        const isDone = completedStepIds.includes(step.id)
        if (isDone) {
            return { ...step, status: 'COMPLETED' }
        }
        if (step.id === 3) {
            return { ...step, status: 'OPTIONAL' }
        }
        return { ...step, status: 'PENDING' }
    })

    const completedCount = completedStepIds.length
    const isRegistrationComplete = completedCount === 5

    const handleBackNavigation = () => {
        if (fromAdmin) {
            localStorage.removeItem("fromAdmin")
            localStorage.removeItem("navigationSource")
            navigate('/admin/students')
        } else {
            navigate('/admission')
        }
    }

    const handleStepClick = (stepId: number) => {
        if (stepId > 1 && !fromAdmin && completedStepIds.length < 5) {
            const isPrevDone = completedStepIds.includes(stepId - 1)
            if (!isPrevDone) {
                toast.error(`Please complete Step ${stepId - 1} first before proceeding to Step ${stepId}`)
                return
            }
        }
        setActiveStepId(stepId)
        setViewMode('stepForm')
        const slug = stepIdToSlug[stepId]
        if (slug) {
            navigate(`/admission/${slug}`)
        }
    }

    const handleSaveAndNext = (currentStepId: number) => {
        if (!completedStepIds.includes(currentStepId)) {
            setCompletedStepIds((prev) => [...prev, currentStepId])
        }
        toast.success(`${rawSteps[currentStepId - 1].title} saved successfully!`)
        if (currentStepId < 5) {
            const nextSlug = stepIdToSlug[currentStepId + 1]
            navigate(`/admission/${nextSlug}`)
        } else {
            navigate('/admission')
            setIsSuccessModalOpen(true)
            toast.success('All registration steps completed!')
        }
    }

    const handleCompleteAll = () => {
        setCompletedStepIds([1, 2, 3, 4, 5])
        setIsDeclared(true)
        setIsSuccessModalOpen(true)
        toast.success('All 5 registration steps completed!')
    }

    const handleReset = () => {
        setCompletedStepIds([])
        setActiveStepId(1)
        setIsDeclared(false)
        setIsSuccessModalOpen(false)

        // Clear all fields
        setChildName('')
        setDob('')
        setGender('')
        setMotherTongue('')
        setReligion('')
        setCaste('')
        setCommunity('')
        setIsHealthy(true)
        setMajorAilment('')
        setChildGoesToSchool(false)
        setPrevSchool('')
        setHasSiblings(false)
        setSiblings([])

        setFather({
            title: '', initials: '', name: '', dob: '', isAlumnus: false, yearsStudied: '',
            classLastStudied: '', yearOfLeaving: '', branch: '', reasonForLeaving: '', qualification: '',
            university: '', occupation: '', employmentCategory: '', designation: '', companyName: '',
            officeAddress: '', monthlyIncome: '', phoneOff: '', mobileNo: ''
        })

        setMother({
            title: '', initials: '', name: '', dob: '', isAlumnus: false, yearsStudied: '',
            classLastStudied: '', yearOfLeaving: '', branch: '', reasonForLeaving: '', qualification: '',
            university: '', isEmployed: false, occupation: '', employmentCategory: '', designation: '',
            companyName: '', officeAddress: '', monthlyIncome: '', phoneOff: '', mobileNo: ''
        })

        setGuardian({
            isApplicable: false, reason: '', gender: '', title: '', initials: '', name: '',
            isEmployed: false, occupation: '', companyName: '', monthlyIncome: '', officeAddress: '',
            phoneOff: '', phoneRes: '', mobileNo: ''
        })

        setComm({
            address: '', pincode: '', residencePhone: '', landmark: '', distanceKm: '',
            commuteMode: [], parentAchievements: '', isTransferFromOutside: false
        })

        toast.info('Registration form reset completely.')
    }

    const handlePrintTrackSheet = () => {
        if (!isRegistrationComplete) {
            toast.error('Registration must be completed before printing Track Sheet.')
            return
        }
        toast.success('Printing Track Sheet...')
        window.print()
    }

    const handlePrintRegistrationForm = () => {
        toast.success('Printing Registration Form...')
        window.print()
    }

    const addSibling = () => {
        setSiblings((prev) => [
            ...prev,
            { name: '', school: 'PSBB', leftStudent: 'No', usn: '', classSec: '', yearLeaving: '' }
        ])
    }

    const removeSibling = (index: number) => {
        setSiblings((prev) => prev.filter((_, i) => i !== index))
    }

    const updateSibling = (index: number, key: keyof Sibling, val: string) => {
        setSiblings((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [key]: val } : item))
        )
    }

    return (
        <div className="space-y-6 mx-auto pb-10">

            {/* MODE 1: OVERVIEW SCREEN */}
            {viewMode === 'overview' && (
                <RegistrationOverview
                    steps={steps}
                    completedCount={completedCount}
                    isRegistrationComplete={isRegistrationComplete}
                    activeStepId={activeStepId}
                    completedStepIds={completedStepIds}
                    isFromAdmin={fromAdmin}
                    onStepClick={handleStepClick}
                    onCompleteAll={handleCompleteAll}
                    onReset={handleReset}
                    onPrintTrackSheet={handlePrintTrackSheet}
                    onPrintRegistrationForm={handlePrintRegistrationForm}
                    onOpenSuccessModal={() => setIsSuccessModalOpen(true)}
                />
            )}

            {/* MODE 2: SEPARATE STEP FORM SCREEN */}
            {viewMode === 'stepForm' && (
                <div className="space-y-5">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

                        {/* Left Steps Progress Sidebar */}
                        <div className="lg:col-span-3">
                            <StepSidebar
                                steps={steps}
                                activeStepId={activeStepId}
                                completedStepIds={completedStepIds}
                                onBackToDashboard={handleBackNavigation}
                                backLabel={fromAdmin ? "Back to Student Master" : "Back to Dashboard"}
                                onStepSelect={handleStepClick}
                                isFromAdmin={fromAdmin}
                            />
                        </div>

                        {/* Right Step Form Workspace */}
                        <div className="lg:col-span-9 space-y-5">
                            <h1 className="text-lg font-bold text-[#0F294A] dark:text-white">{steps[activeStepId - 1].title}</h1>

                            {activeStepId === 1 && (
                                <Step1ApplicantDetails
                                    childName={childName}
                                    setChildName={setChildName}
                                    dob={dob}
                                    setDob={setDob}
                                    gender={gender}
                                    setGender={setGender}
                                    motherTongue={motherTongue}
                                    setMotherTongue={setMotherTongue}
                                    nationality={nationality}
                                    setNationality={setNationality}
                                    religion={religion}
                                    setReligion={setReligion}
                                    caste={caste}
                                    setCaste={setCaste}
                                    community={community}
                                    setCommunity={setCommunity}
                                    isHealthy={isHealthy}
                                    setIsHealthy={setIsHealthy}
                                    majorAilment={majorAilment}
                                    setMajorAilment={setMajorAilment}
                                    childGoesToSchool={childGoesToSchool}
                                    setChildGoesToSchool={setChildGoesToSchool}
                                    prevSchool={prevSchool}
                                    setPrevSchool={setPrevSchool}
                                    hasSiblings={hasSiblings}
                                    setHasSiblings={setHasSiblings}
                                    siblings={siblings}
                                    addSibling={addSibling}
                                    removeSibling={removeSibling}
                                    updateSibling={updateSibling}
                                    onSaveAndExit={() => setViewMode('overview')}
                                    onSaveAndNext={() => handleSaveAndNext(1)}
                                />
                            )}

                            {activeStepId === 2 && (
                                <Step2ParentDetails
                                    father={father}
                                    setFather={setFather}
                                    mother={mother}
                                    setMother={setMother}
                                    onClear={() => {
                                        setFather({
                                            title: '', initials: '', name: '', dob: '', isAlumnus: false, yearsStudied: '',
                                            classLastStudied: '', yearOfLeaving: '', branch: '', reasonForLeaving: '', qualification: '',
                                            university: '', occupation: '', employmentCategory: '', designation: '', companyName: '',
                                            officeAddress: '', monthlyIncome: '', phoneOff: '', mobileNo: ''
                                        })
                                        setMother({
                                            title: '', initials: '', name: '', dob: '', isAlumnus: false, yearsStudied: '',
                                            classLastStudied: '', yearOfLeaving: '', branch: '', reasonForLeaving: '', qualification: '',
                                            university: '', isEmployed: false, occupation: '', employmentCategory: '', designation: '',
                                            companyName: '', officeAddress: '', monthlyIncome: '', phoneOff: '', mobileNo: ''
                                        })
                                        toast.info('Parent details cleared')
                                    }}
                                    onSaveAndExit={() => setViewMode('overview')}
                                    onSaveAndNext={() => handleSaveAndNext(2)}
                                />
                            )}

                            {activeStepId === 3 && (
                                <Step3GuardianDetails
                                    guardian={guardian}
                                    setGuardian={setGuardian}
                                    onClear={() => {
                                        setGuardian({
                                            isApplicable: false, reason: '', gender: '', title: '', initials: '', name: '',
                                            isEmployed: false, occupation: '', companyName: '', monthlyIncome: '', officeAddress: '',
                                            phoneOff: '', phoneRes: '', mobileNo: ''
                                        })
                                        toast.info('Guardian details cleared')
                                    }}
                                    onSaveAndExit={() => setViewMode('overview')}
                                    onSaveAndNext={() => handleSaveAndNext(3)}
                                />
                            )}

                            {activeStepId === 4 && (
                                <Step4CommunicationDetails
                                    comm={comm}
                                    setComm={setComm}
                                    onClear={() => {
                                        setComm({
                                            address: '', pincode: '', residencePhone: '', landmark: '', distanceKm: '',
                                            commuteMode: [], parentAchievements: '', isTransferFromOutside: false
                                        })
                                        toast.info('Communication details cleared')
                                    }}
                                    onSaveAndExit={() => setViewMode('overview')}
                                    onSaveAndNext={() => handleSaveAndNext(4)}
                                />
                            )}

                            {activeStepId === 5 && (
                                <Step5Declaration
                                    declarantType={declarantType}
                                    setDeclarantType={setDeclarantType}
                                    childName={childName}
                                    setChildName={setChildName}
                                    isDeclared={isDeclared}
                                    setIsDeclared={setIsDeclared}
                                    onSaveAndExit={() => setViewMode('overview')}
                                    onSaveAndNext={() => handleSaveAndNext(5)}
                                />
                            )}

                        </div>
                    </div>
                </div>
            )}

            {/* CONTINUOUS ANIMATED MARQUEE TICKER BANNER AT BOTTOM OF ADMISSION */}
            <div className="overflow-hidden rounded-2xl text-white p-3 shadow-lg border border-white/20 relative flex items-center gap-3 bg-app-gradient" style={{ background: "var(--app-gradient)" }}>
                <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5 shrink-0 z-10 shadow-xs border border-white/30">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 animate-ping"></span>
                    <span className="text-yellow-200">IMPORTANT NOTICE</span>
                </div>
                <div className="overflow-hidden w-full relative">
                    <div className="animate-marquee font-bold text-xs sm:text-sm tracking-wide flex items-center gap-8">
                        <span>⚠️ Last Day of Submission : <strong className="underline decoration-yellow-300 underline-offset-4 text-yellow-200 font-extrabold text-sm sm:text-base">30-09-2026</strong></span>
                        <span>•</span>
                        <span>📋 Please complete and submit all required application steps before the deadline</span>
                        <span>•</span>
                        <span>⚠️ Last Day of Submission : <strong className="underline decoration-yellow-300 underline-offset-4 text-yellow-200 font-extrabold text-sm sm:text-base">30-09-2026</strong></span>
                        <span>•</span>
                        <span>📋 Please complete and submit all required application steps before the deadline</span>
                    </div>
                </div>
            </div>

            {/* REGISTRATION SUCCESS DETAILS MODAL */}
            <RegistrationSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                onPrintTrackSheet={handlePrintTrackSheet}
                registrationNo={applicationNo}
                submissionDate="14/09/2025"
                timings="9:00 AM - 11:00 AM"
            />

        </div>
    )
}