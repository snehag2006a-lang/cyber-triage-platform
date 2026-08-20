type PortalSelectionProps = {
  onSelectPortal: (portal: string) => void
  onBack: () => void
}

function PortalSelection({
  onSelectPortal,
  onBack,
}: PortalSelectionProps) {
  const portals = [
    {
      name: 'Security Analyst',
      icon: '🔍',
      description:
        'Monitor threats, investigate alerts and analyze security events.',
      recommended: true,
    },
    {
      name: 'SOC Operator',
      icon: '🖥️',
      description:
        'Monitor real-time activity and respond to active threats.',
    },
    {
      name: 'Incident Responder',
      icon: '🚨',
      description:
        'Manage incidents, attack chains and response actions.',
    },
    {
      name: 'Forensic Investigator',
      icon: '🔬',
      description:
        'Analyze digital evidence and perform cyber investigations.',
    },
    {
      name: 'Administrator',
      icon: '⚙️',
      description:
        'Configure environments, users and platform settings.',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 text-4xl">🛡️</div>

          <h1 className="text-3xl font-bold">
            Select Your Portal
          </h1>

          <p className="mt-2 text-slate-400">
            Choose the workspace that matches your security role
          </p>
        </div>

        {/* Portal Cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {portals.map((portal) => (
            <button
              key={portal.name}
              onClick={() => onSelectPortal(portal.name)}
              className={`group rounded-2xl border p-6 text-left transition hover:-translate-y-1 ${
                portal.recommended
                  ? 'border-cyan-400/30 bg-slate-900 hover:border-cyan-400 hover:bg-slate-800'
                  : 'border-slate-800 bg-slate-900 hover:border-cyan-400/50 hover:bg-slate-800'
              }`}
            >
              <div className="mb-4 text-3xl">
                {portal.icon}
              </div>

              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  {portal.name}
                </h2>

                {portal.recommended && (
                  <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-[10px] font-medium text-cyan-400">
                    Recommended
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {portal.description}
              </p>

              <div className="mt-4 text-sm font-medium text-cyan-400">
                Continue →
              </div>
            </button>
          ))}

        </div>

        {/* Back */}
        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="text-sm text-slate-400 transition hover:text-cyan-400"
          >
            ← Back to Login
          </button>
        </div>

      </div>
    </div>
  )
}

export default PortalSelection