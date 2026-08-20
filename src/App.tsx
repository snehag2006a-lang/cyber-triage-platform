import { useState } from 'react'

import Login from './components/Login'
import PortalSelection from './components/PortalSelection'
import EnvironmentSelection from './components/EnvironmentSelection'
import CaseInformation from './components/CaseInformation'
import TriageDashboard from './components/TriageDashboard'
import CaseHistory from './components/CaseHistory'
import SecurityCenter from './components/SecurityCenter'

import { analyzeCase } from './services/triageEngine'
import type { TriageResult } from './services/triageEngine'

type Page =
  | 'login'
  | 'portals'
  | 'environments'
  | 'enterprise-environments'
  | 'case'
  | 'dashboard'
  | 'history'
  | 'security-center'

type CaseData = {
  caseId: string
  title: string
  incidentType: string
  severity: string
  description: string
  affectedAssets: string
  detectedAt: string
  iocs: string
  evidence: string
  notes: string
}

type EnterpriseEnvironment =
  | 'Hospital'
  | 'Bank'
  | 'College / University'
  | 'Company'

type DatasetRecord = {
  id: string
  timestamp: string
  userId: string
  ipAddress: string
  failedLogins: number
  spamFlag: boolean
  suspiciousFlag: boolean
  description: string
}

/*
 * DEMO SECURITY DATASET
 *
 * This is intentionally static demo data.
 * Later, this can be replaced with a CSV/API/database.
 */
const enterpriseDatasets: Record<
  EnterpriseEnvironment,
  DatasetRecord[]
> = {
  Hospital: [
    {
      id: 'H001',
      timestamp: '2026-08-20 09:15',
      userId: 'hospital-user-102',
      ipAddress: '192.168.10.21',
      failedLogins: 1,
      spamFlag: false,
      suspiciousFlag: false,
      description: 'Normal workstation activity',
    },
    {
      id: 'H002',
      timestamp: '2026-08-20 10:32',
      userId: 'hospital-user-208',
      ipAddress: '192.168.10.45',
      failedLogins: 7,
      spamFlag: true,
      suspiciousFlag: true,
      description:
        'Suspicious login attempts detected on hospital workstation',
    },
    {
      id: 'H003',
      timestamp: '2026-08-20 11:05',
      userId: 'hospital-admin-15',
      ipAddress: '185.72.10.25',
      failedLogins: 6,
      spamFlag: false,
      suspiciousFlag: true,
      description:
        'Repeated authentication failures against hospital administration system',
    },
    {
      id: 'H004',
      timestamp: '2026-08-20 11:40',
      userId: 'hospital-user-310',
      ipAddress: '192.168.10.51',
      failedLogins: 1,
      spamFlag: false,
      suspiciousFlag: false,
      description: 'Normal patient management system activity',
    },
  ],

  Bank: [
    {
      id: 'B001',
      timestamp: '2026-08-20 09:10',
      userId: 'bank-user-101',
      ipAddress: '185.44.21.10',
      failedLogins: 7,
      spamFlag: true,
      suspiciousFlag: true,
      description:
        'Repeated failed logins followed by suspicious transaction activity',
    },
    {
      id: 'B002',
      timestamp: '2026-08-20 09:25',
      userId: 'bank-user-204',
      ipAddress: '185.44.21.11',
      failedLogins: 5,
      spamFlag: true,
      suspiciousFlag: true,
      description:
        'Potential spam/fraud activity detected',
    },
    {
      id: 'B003',
      timestamp: '2026-08-20 10:05',
      userId: 'bank-user-310',
      ipAddress: '185.44.21.15',
      failedLogins: 8,
      spamFlag: false,
      suspiciousFlag: true,
      description:
        'Multiple failed authentication attempts',
    },
    {
      id: 'B004',
      timestamp: '2026-08-20 10:42',
      userId: 'bank-user-402',
      ipAddress: '185.44.21.20',
      failedLogins: 1,
      spamFlag: false,
      suspiciousFlag: false,
      description: 'Normal banking activity',
    },
    {
      id: 'B005',
      timestamp: '2026-08-20 11:18',
      userId: 'bank-user-510',
      ipAddress: '185.44.21.25',
      failedLogins: 6,
      spamFlag: true,
      suspiciousFlag: true,
      description:
        'Suspicious automated request pattern',
    },
  ],

  'College / University': [
    {
      id: 'C001',
      timestamp: '2026-08-20 08:40',
      userId: 'student-1001',
      ipAddress: '10.20.1.15',
      failedLogins: 1,
      spamFlag: false,
      suspiciousFlag: false,
      description:
        'Normal student portal activity',
    },
    {
      id: 'C002',
      timestamp: '2026-08-20 09:50',
      userId: 'student-1055',
      ipAddress: '10.20.1.33',
      failedLogins: 6,
      spamFlag: true,
      suspiciousFlag: true,
      description:
        'Multiple failed student portal logins with spam indicators',
    },
    {
      id: 'C003',
      timestamp: '2026-08-20 10:20',
      userId: 'faculty-204',
      ipAddress: '10.20.2.45',
      failedLogins: 8,
      spamFlag: false,
      suspiciousFlag: true,
      description:
        'Repeated authentication failures against faculty portal',
    },
    {
      id: 'C004',
      timestamp: '2026-08-20 11:10',
      userId: 'student-1120',
      ipAddress: '10.20.1.55',
      failedLogins: 1,
      spamFlag: false,
      suspiciousFlag: false,
      description:
        'Normal learning management system activity',
    },
  ],

  Company: [
    {
      id: 'CO001',
      timestamp: '2026-08-20 08:55',
      userId: 'employee-100',
      ipAddress: '172.16.10.10',
      failedLogins: 1,
      spamFlag: false,
      suspiciousFlag: false,
      description:
        'Normal employee activity',
    },
    {
      id: 'CO002',
      timestamp: '2026-08-20 09:35',
      userId: 'employee-220',
      ipAddress: '172.16.10.20',
      failedLogins: 7,
      spamFlag: true,
      suspiciousFlag: true,
      description:
        'Potential phishing/spam activity detected on employee account',
    },
    {
      id: 'CO003',
      timestamp: '2026-08-20 10:15',
      userId: 'employee-315',
      ipAddress: '172.16.10.35',
      failedLogins: 6,
      spamFlag: false,
      suspiciousFlag: true,
      description:
        'Repeated failed authentication attempts',
    },
    {
      id: 'CO004',
      timestamp: '2026-08-20 11:20',
      userId: 'employee-410',
      ipAddress: '172.16.10.41',
      failedLogins: 1,
      spamFlag: false,
      suspiciousFlag: false,
      description:
        'Normal corporate application activity',
    },
  ],
}

function App() {
  const [page, setPage] = useState<Page>('login')

  const [selectedPortal, setSelectedPortal] =
    useState('')

  const [selectedEnvironment, setSelectedEnvironment] =
    useState('')

  const [caseData, setCaseData] =
    useState<CaseData | null>(null)

  const [triageResult, setTriageResult] =
    useState<TriageResult | null>(null)

  // LOGIN

  const handleLogin = () => {
    setPage('portals')
  }

  // PORTAL

  const handlePortalSelect = (portal: string) => {
    setSelectedPortal(portal)
    setPage('environments')
  }

  // ENVIRONMENT

  const handleEnvironmentSelect = (
    environment: string,
  ) => {
    /*
     * ONLY SECURITY ANALYST + ENTERPRISE
     * gets the new enterprise environment selection.
     *
     * Other portals remain unchanged.
     */
    if (
      selectedPortal === 'Security Analyst' &&
      environment === 'Enterprise'
    ) {
      setPage('enterprise-environments')
      return
    }

    // Existing behavior for all other portals
    setSelectedEnvironment(environment)
    setPage('case')
  }

  // ENTERPRISE ENVIRONMENT SELECTION

  const handleEnterpriseEnvironmentSelect = (
    environment: EnterpriseEnvironment,
  ) => {
    const dataset =
      enterpriseDatasets[environment]

    /*
     * Analyze the selected environment dataset.
     */
    const suspiciousRecords =
      dataset.filter(
        (record) =>
          record.suspiciousFlag ||
          record.spamFlag,
      )

    const spamRecords =
      dataset.filter(
        (record) => record.spamFlag,
      )

    const highRiskRecords =
      dataset.filter(
        (record) =>
          record.suspiciousFlag &&
          record.failedLogins >= 5,
      )

    /*
     * Store the actual selected environment.
     */
    const environmentName =
      `Enterprise - ${environment}`

    setSelectedEnvironment(environmentName)

    /*
     * If suspicious activity is found,
     * show dataset-based security alert.
     */
    if (suspiciousRecords.length > 0) {
      alert(
        `🚨 SECURITY ALERT\n\n` +
          `${environment} Environment\n\n` +
          `Suspicious activity detected!\n\n` +
          `Dataset records analyzed: ${dataset.length}\n` +
          `Suspicious records: ${suspiciousRecords.length}\n` +
          `Spam/Fraud indicators: ${spamRecords.length}\n` +
          `High-risk login attempts: ${highRiskRecords.length}\n\n` +
          `Affected users:\n` +
          suspiciousRecords
            .map(
              (record) =>
                `• ${record.userId} (${record.ipAddress})`,
            )
            .join('\n') +
          `\n\nClick OK to continue to Case Investigation.`,
      )
    } else {
      /*
       * No suspicious activity.
       */
      alert(
        `✅ DATASET ANALYSIS COMPLETE\n\n` +
          `${environment} Environment\n\n` +
          `No suspicious or spam activity was detected in the current dataset.\n\n` +
          `Records analyzed: ${dataset.length}\n\n` +
          `Click OK to continue to Case Information.`,
      )
    }

    /*
     * After the popup, continue to
     * Security Analyst Case Information.
     */
    setPage('case')
  }

  // BACK FROM ENTERPRISE ENVIRONMENTS

  const handleEnterpriseBack = () => {
    setPage('environments')
  }

  // SAVE CASE

  const saveCaseToBackend = async (
    data: CaseData,
    result: TriageResult,
  ) => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/cases',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            portal: selectedPortal,
            environment: selectedEnvironment,
            case: data,
            triageResult: result,
          }),
        },
      )

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(
          responseData.message ||
            'Failed to save case',
        )
      }

      console.log(
        'Case saved successfully:',
        responseData,
      )

      return true
    } catch (error) {
      console.error(
        'Failed to save case:',
        error,
      )

      return false
    }
  }

  // CASE SUBMIT

  const handleCaseSubmit = async (
    data: CaseData,
  ) => {
    setCaseData(data)

    const result = analyzeCase({
      incidentType: data.incidentType,
      severity: data.severity,
      description: data.description,
      affectedAssets: data.affectedAssets,
      iocs: data.iocs,
      evidence: data.evidence,
      environment: selectedEnvironment,
    })

    setTriageResult(result)

    await saveCaseToBackend(
      data,
      result,
    )

    setPage('dashboard')
  }

  // NEW CASE

  const handleNewCase = () => {
    setCaseData(null)
    setTriageResult(null)
    setPage('case')
  }

  // CASE HISTORY

  const handleCaseHistory = () => {
    setPage('history')
  }

  // SECURITY CENTER

  const handleSecurityCenter = () => {
    setPage('security-center')
  }

  // DIGITAL TWIN

  const handleDigitalTwin = () => {
    alert(
      `Digital Twin for ${selectedEnvironment} is ready for simulation.`,
    )
  }

  // LOGIN PAGE

  if (page === 'login') {
    return (
      <Login
        onLogin={handleLogin}
      />
    )
  }

  // PORTAL PAGE

  if (page === 'portals') {
    return (
      <PortalSelection
        onSelectPortal={
          handlePortalSelect
        }
        onBack={() =>
          setPage('login')
        }
      />
    )
  }

  // ENVIRONMENT PAGE

  if (page === 'environments') {
    return (
      <EnvironmentSelection
        selectedPortal={
          selectedPortal
        }
        onSelectEnvironment={
          handleEnvironmentSelect
        }
        onBack={() =>
          setPage('portals')
        }
      />
    )
  }

  // ENTERPRISE ENVIRONMENT PAGE
  // SECURITY ANALYST ONLY

  if (
    page === 'enterprise-environments'
  ) {
    const enterpriseOptions: {
      name: EnterpriseEnvironment
      icon: string
      description: string
    }[] = [
      {
        name: 'Hospital',
        icon: '🏥',
        description:
          'Analyze hospital systems, patient platforms, medical devices and healthcare infrastructure.',
      },
      {
        name: 'Bank',
        icon: '🏦',
        description:
          'Analyze banking systems, authentication activity, transactions and potential fraud/spam indicators.',
      },
      {
        name: 'College / University',
        icon: '🎓',
        description:
          'Analyze academic systems, student portals, authentication and campus infrastructure.',
      },
      {
        name: 'Company',
        icon: '🏢',
        description:
          'Analyze corporate applications, employees, endpoints and internal infrastructure.',
      },
    ]

    return (
      <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-5xl">

          {/* Header */}

          <div className="mb-10 text-center">
            <div className="mb-4 text-5xl">
              🏢
            </div>

            <h1 className="text-3xl font-bold">
              Select Enterprise Environment
            </h1>

            <p className="mt-2 text-slate-400">
              Security Analyst • Choose one environment to analyze
            </p>
          </div>

          {/* Enterprise Options */}

          <div className="grid gap-5 md:grid-cols-2">

            {enterpriseOptions.map(
              (environment) => (
                <button
                  key={environment.name}
                  onClick={() =>
                    handleEnterpriseEnvironmentSelect(
                      environment.name,
                    )
                  }
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-7 text-left transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-800"
                >
                  <div className="mb-4 text-5xl">
                    {environment.icon}
                  </div>

                  <h2 className="text-xl font-semibold">
                    {environment.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {environment.description}
                  </p>

                  <div className="mt-5 text-sm font-medium text-cyan-400">
                    Analyze environment →
                  </div>
                </button>
              ),
            )}

          </div>

          {/* Back */}

          <div className="mt-8 text-center">
            <button
              onClick={
                handleEnterpriseBack
              }
              className="text-sm text-slate-400 transition hover:text-cyan-400"
            >
              ← Back to Environments
            </button>
          </div>

        </div>
      </div>
    )
  }

  // CASE PAGE

  if (page === 'case') {
    return (
      <CaseInformation
        selectedPortal={
          selectedPortal
        }
        selectedEnvironment={
          selectedEnvironment
        }
        onSubmit={
          handleCaseSubmit
        }
        onBack={() =>
          selectedPortal ===
            'Security Analyst' &&
          selectedEnvironment.startsWith(
            'Enterprise - ',
          )
            ? setPage(
                'enterprise-environments',
              )
            : setPage('environments')
        }
      />
    )
  }

  // DASHBOARD

  if (
    page === 'dashboard' &&
    caseData &&
    triageResult
  ) {
    return (
      <TriageDashboard
        selectedPortal={
          selectedPortal
        }
        selectedEnvironment={
          selectedEnvironment
        }
        caseData={
          caseData
        }
        triageResult={
          triageResult
        }
        onNewCase={
          handleNewCase
        }
        onCaseHistory={
          handleCaseHistory
        }
        onSecurityCenter={
          handleSecurityCenter
        }
      />
    )
  }

  // SECURITY CENTER

  if (page === 'security-center') {
    return (
      <SecurityCenter
        selectedEnvironment={
          selectedEnvironment
        }
        onOpenCase={() => {
          setPage('case')
        }}
        onDigitalTwin={
          handleDigitalTwin
        }
      />
    )
  }

  // CASE HISTORY

  if (page === 'history') {
    return (
      <CaseHistory
        onBack={() => {
          if (
            caseData &&
            triageResult
          ) {
            setPage('dashboard')
          } else {
            setPage('portals')
          }
        }}
        onNewCase={() => {
          setCaseData(null)
          setTriageResult(null)
          setPage('portals')
        }}
      />
    )
  }

  return null
}

export default App