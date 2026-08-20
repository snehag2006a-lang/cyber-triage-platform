import { useEffect, useState } from 'react'

type SavedCase = {
  id: number
  case_id: string
  portal: string
  environment: string
  title: string
  incident_type: string
  severity: string
  description: string
  affected_assets: string
  detected_at: string
  iocs: string
  evidence: string
  notes: string
  risk_score: number | null
  threat_level: string | null
  confidence: number | null
  priority: string | null
  attack_stage: string | null
  created_at: string
}

type CaseHistoryProps = {
  onBack: () => void
  onNewCase: () => void
}

function CaseHistory({
  onBack,
  onNewCase,
}: CaseHistoryProps) {
  const [cases, setCases] = useState<SavedCase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCases = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/cases',
        )

        if (!response.ok) {
          throw new Error('Failed to load cases')
        }

        const data = await response.json()

        setCases(data.cases || [])
      } catch (err) {
        console.error(err)

        setError(
          'Unable to load case history. Make sure the backend is running.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadCases()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                📁
              </span>

              <div>
                <h1 className="text-3xl font-bold">
                  Case History
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Previously investigated cyber security cases
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">

            <button
              onClick={onBack}
              className="rounded-lg border border-slate-700 px-5 py-2.5 font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              ← Dashboard
            </button>

            <button
              onClick={onNewCase}
              className="rounded-lg bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              + New Case
            </button>

          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Total Cases
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              {cases.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Critical
            </p>

            <p className="mt-2 text-3xl font-bold text-red-400">
              {
                cases.filter(
                  (item) =>
                    item.threat_level ===
                    'CRITICAL',
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              High Risk
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-400">
              {
                cases.filter(
                  (item) =>
                    item.threat_level ===
                    'HIGH',
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              P1 Cases
            </p>

            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {
                cases.filter(
                  (item) =>
                    item.priority === 'P1',
                ).length
              }
            </p>
          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <p className="text-slate-400">
              Loading case history...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          cases.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">

              <div className="text-5xl">
                📂
              </div>

              <h2 className="mt-4 text-xl font-semibold">
                No cases found
              </h2>

              <p className="mt-2 text-slate-400">
                Create your first cyber triage case.
              </p>

              <button
                onClick={onNewCase}
                className="mt-6 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
              >
                Create Case
              </button>

            </div>
          )}

        {/* Cases */}
        {!loading &&
          cases.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px] text-left">

                  <thead className="border-b border-slate-800 bg-slate-950">

                    <tr>
                      <th className="px-5 py-4 text-xs uppercase tracking-wide text-slate-500">
                        Case
                      </th>

                      <th className="px-5 py-4 text-xs uppercase tracking-wide text-slate-500">
                        Incident
                      </th>

                      <th className="px-5 py-4 text-xs uppercase tracking-wide text-slate-500">
                        Environment
                      </th>

                      <th className="px-5 py-4 text-xs uppercase tracking-wide text-slate-500">
                        Risk
                      </th>

                      <th className="px-5 py-4 text-xs uppercase tracking-wide text-slate-500">
                        Threat
                      </th>

                      <th className="px-5 py-4 text-xs uppercase tracking-wide text-slate-500">
                        Priority
                      </th>

                      <th className="px-5 py-4 text-xs uppercase tracking-wide text-slate-500">
                        Created
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {cases.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-slate-800 transition hover:bg-slate-800/50"
                      >

                        <td className="px-5 py-5">
                          <p className="font-semibold text-cyan-400">
                            {item.case_id}
                          </p>

                          <p className="mt-1 text-sm text-slate-300">
                            {item.title}
                          </p>
                        </td>

                        <td className="px-5 py-5">
                          <span className="rounded-md bg-slate-800 px-3 py-1 text-sm text-slate-300">
                            {item.incident_type}
                          </span>
                        </td>

                        <td className="px-5 py-5 text-sm text-slate-300">
                          {item.environment}
                        </td>

                        <td className="px-5 py-5">

                          <span className="font-bold text-white">
                            {item.risk_score ?? '-'}
                          </span>

                          <span className="text-slate-500">
                            /100
                          </span>

                        </td>

                        <td className="px-5 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              item.threat_level ===
                              'CRITICAL'
                                ? 'bg-red-500/15 text-red-400'
                                : item.threat_level ===
                                  'HIGH'
                                ? 'bg-orange-500/15 text-orange-400'
                                : item.threat_level ===
                                  'MEDIUM'
                                ? 'bg-yellow-500/15 text-yellow-400'
                                : 'bg-green-500/15 text-green-400'
                            }`}
                          >
                            {item.threat_level ||
                              'UNKNOWN'}
                          </span>
                        </td>

                        <td className="px-5 py-5">
                          <span className="font-semibold text-cyan-400">
                            {item.priority ||
                              '-'}
                          </span>
                        </td>

                        <td className="px-5 py-5 text-sm text-slate-400">
                          {new Date(
                            item.created_at,
                          ).toLocaleString()}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

            </div>
          )}

      </div>
    </div>
  )
}

export default CaseHistory