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

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 text-4xl">🏢</div>

          <h1 className="text-3xl font-bold">
            Select Your Environment
          </h1>

          <p className="mt-2 text-slate-400">
            {selectedPortal} • Choose the environment you want to investigate
          </p>
        </div>

        {/* Environment Cards */}
        <div className="grid gap-5 md:grid-cols-2">

          {environments.map((environment) => (
            <button
              key={environment.name}
              onClick={() => onSelectEnvironment(environment.name)}
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
                {environment.name === 'Hybrid' && (
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

        {/* Back */}
        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="text-sm text-slate-400 transition hover:text-cyan-400"
          >
            ← Back to Portals
          </button>
        </div>

      </div>
    </div>
  )
}

export default EnvironmentSelection