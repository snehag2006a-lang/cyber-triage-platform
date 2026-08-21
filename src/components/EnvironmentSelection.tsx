import { useState } from 'react'

type EnvironmentSelectionProps = {
  selectedPortal: string
  onSelectEnvironment: (environment: string) => void
  onBack: () => void
}

function EnvironmentSelection({
  selectedPortal,
  onSelectEnvironment,
  onBack,
}: EnvironmentSelectionProps) {
  const [showEnterpriseOptions, setShowEnterpriseOptions] =
    useState(false)

  const [, setSelectedIndustry] = useState('')

  const environments = [
    {
      name: 'Enterprise',
      icon: '🏢',
      description:
        'Monitor corporate systems, users, applications and internal infrastructure.',
    },
    {
      name: 'Cloud',
      icon: '☁️',
      description:
        'Investigate cloud workloads, identities, services and infrastructure activity.',
    },
    {
      name: 'Network',
      icon: '🌐',
      description:
        'Analyze network traffic, connections, suspicious activity and attack patterns.',
    },
    {
      name: 'Endpoint',
      icon: '💻',
      description:
        'Investigate laptops, desktops, servers and endpoint security events.',
    },
    {
      name: 'Hybrid',
      icon: '🔄',
      description:
        'Correlate evidence across enterprise, cloud, network and endpoint environments.',
    },
  ]

  const industries = [
    {
      name: 'Hospital',
      icon: '🏥',
      description:
        'Analyze hospital systems, patient platforms, medical devices and healthcare infrastructure.',
    },
    {
      name: 'Banks',
      icon: '🏦',
      description:
        'Analyze banking transactions, login activity, accounts and suspicious financial activity.',
    },
    {
      name: 'Colleges / Universities',
      icon: '🎓',
      description:
        'Analyze student systems, university networks, accounts and academic infrastructure.',
    },
    {
      name: 'Companies',
      icon: '🏢',
      description:
        'Analyze corporate applications, employees, endpoints and business infrastructure.',
    },
  ]

  const isSecurityAnalyst =
    selectedPortal === 'Security Analyst'

  const handleEnvironmentClick = (
    environment: string,
  ) => {
    if (
      isSecurityAnalyst &&
      environment === 'Enterprise'
    ) {
      setShowEnterpriseOptions(true)
      return
    }

    onSelectEnvironment(environment)
  }

  const handleIndustryClick = (
    industry: string,
  ) => {
    setSelectedIndustry(industry)

    /*
     * Temporary demo alert.
     *
     * We will connect the real dataset analysis
     * after this flow is working correctly.
     */
    if (industry === 'Banks') {
      window.alert(
        '🚨 SECURITY ALERT\n\n' +
          'Banking environment selected.\n\n' +
          'Dataset analysis detected suspicious activity.\n\n' +
          'Potential spam/fraud activity found.\n\n' +
          'The case investigation will now continue.',
      )
    } else {
      window.alert(
        'Environment Selected\n\n' +
          `${industry} environment selected.\n\n` +
          'The case investigation will now continue.',
      )
    }

    onSelectEnvironment(
      `Enterprise - ${industry}`,
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-10 text-center">
          <div className="mb-4 text-4xl">
            {showEnterpriseOptions ? '🏢' : '🌐'}
          </div>

          <h1 className="text-3xl font-bold">
            {showEnterpriseOptions
              ? 'Select Enterprise Type'
              : 'Select Your Environment'}
          </h1>

          <p className="mt-2 text-slate-400">
            {selectedPortal} •{' '}
            {showEnterpriseOptions
              ? 'Choose the organization type you want to investigate'
              : 'Choose the environment you want to investigate'}
          </p>
        </div>

        {/* ENTERPRISE INDUSTRY SELECTION */}

        {showEnterpriseOptions ? (
          <>
            <div className="grid gap-5 md:grid-cols-2">

              {industries.map((industry) => (
                <button
                  key={industry.name}
                  type="button"
                  onClick={() =>
                    handleIndustryClick(
                      industry.name,
                    )
                  }
                  className="group rounded-2xl border border-slate-800 bg-slate-900 p-7 text-left transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-800"
                >
                  <div className="mb-4 text-4xl">
                    {industry.icon}
                  </div>

                  <h2 className="text-xl font-semibold">
                    {industry.name}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {industry.description}
                  </p>

                  <div className="mt-5 text-sm font-medium text-cyan-400">
                    Select {industry.name} →
                  </div>
                </button>
              ))}

            </div>

            {/* BACK TO ENVIRONMENTS */}

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowEnterpriseOptions(false)
                  setSelectedIndustry('')
                }}
                className="text-sm text-slate-400 transition hover:text-cyan-400"
              >
                ← Back to Environments
              </button>
            </div>
          </>
        ) : (
          <>
            {/* NORMAL ENVIRONMENT SELECTION */}

            <div className="grid gap-5 md:grid-cols-2">

              {environments.map((environment) => (
                <button
                  key={environment.name}
                  type="button"
                  onClick={() =>
                    handleEnvironmentClick(
                      environment.name,
                    )
                  }
                  className={`group rounded-2xl border bg-slate-900 p-7 text-left transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-800 ${
                    environment.name === 'Hybrid'
                      ? 'md:col-span-2'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="mb-4 text-4xl">
                    {environment.icon}
                  </div>

                  <h2 className="text-xl font-semibold">
                    {environment.name}

                    {environment.name ===
                      'Enterprise' &&
                      isSecurityAnalyst && (
                        <span className="ml-3 rounded-full bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-400">
                          Industry Selection
                        </span>
                      )}

                    {environment.name ===
                      'Hybrid' && (
                      <span className="ml-3 rounded-full bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-400">
                        Advanced
                      </span>
                    )}
                  </h2>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                    {environment.description}
                  </p>

                  <div className="mt-5 text-sm font-medium text-cyan-400">
                    Select environment →
                  </div>
                </button>
              ))}

            </div>

            {/* BACK */}

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={onBack}
                className="text-sm text-slate-400 transition hover:text-cyan-400"
              >
                ← Back to Portals
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default EnvironmentSelection