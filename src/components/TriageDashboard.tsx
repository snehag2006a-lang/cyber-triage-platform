import type { TriageResult } from '../services/triageEngine'

type TriageDashboardProps = {
  selectedPortal: string
  selectedEnvironment: string

  caseData: {
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

   triageResult: TriageResult

  onNewCase: () => void
  onCaseHistory: () => void
  onSecurityCenter: () => void
}

function TriageDashboard({
  selectedPortal,
  selectedEnvironment,
  caseData,
  triageResult,
  onNewCase,
  onCaseHistory,
}: TriageDashboardProps) {
  const {
    riskScore,
    threatLevel,
    confidence,
    priority,
    attackStage,
    attackChain,
    findings,
    recommendations,
  } = triageResult

  const threatColor =
    threatLevel === 'CRITICAL'
      ? 'text-red-400'
      : threatLevel === 'HIGH'
        ? 'text-orange-400'
        : threatLevel === 'MEDIUM'
          ? 'text-yellow-400'
          : 'text-green-400'

  const riskBarWidth = `${Math.min(
    Math.max(riskScore, 0),
    100,
  )}%`

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}

      <header className="border-b border-slate-800 bg-slate-900/80">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10 text-lg">
              🛡️
            </div>

            <div>
              <h1 className="font-bold">
                Cyber Triage
              </h1>

              <p className="text-xs text-slate-500">
                Universal Cyber Intelligence Platform
              </p>
            </div>

          </div>

          <div className="text-right">

            <p className="text-sm font-semibold">
              {caseData.caseId}
            </p>

            <p className="text-xs text-slate-500">
              {selectedEnvironment}
            </p>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* CASE HEADER */}

        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <div className="mb-2 flex items-center gap-2 text-sm">

              <span className="text-cyan-400">
                {selectedPortal}
              </span>

              <span className="text-slate-600">
                /
              </span>

              <span className="text-slate-400">
                {selectedEnvironment}
              </span>

            </div>

            <h2 className="text-3xl font-bold">
              {caseData.title}
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
              {caseData.description}
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={onCaseHistory}
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              📋 Case History
            </button>

            <button
              onClick={onNewCase}
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              + New Case
            </button>

          </div>

        </div>

        {/* RISK OVERVIEW */}

        <div className="grid gap-4 md:grid-cols-4">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Risk Score
            </p>

            <div className="mt-2 flex items-end gap-2">

              <span className="text-4xl font-bold text-cyan-400">
                {riskScore}
              </span>

              <span className="mb-1 text-sm text-slate-500">
                / 100
              </span>

            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                style={{
                  width: riskBarWidth,
                }}
              />

            </div>

          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Threat Level
            </p>

            <p
              className={`mt-3 text-2xl font-bold ${threatColor}`}
            >
              {threatLevel}
            </p>

          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Analysis Confidence
            </p>

            <p className="mt-3 text-2xl font-bold text-cyan-400">
              {confidence}%
            </p>

          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Response Priority
            </p>

            <p className="mt-3 text-2xl font-bold text-red-400">
              {priority}
            </p>

          </div>

        </div>

        {/* ATTACK ANALYSIS */}

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h3 className="text-lg font-semibold">
                ⚔️ Attack Analysis
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Current stage identified by the triage engine
              </p>

            </div>

            <div className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-2">

              <p className="text-xs text-slate-500">
                Current Stage
              </p>

              <p className="font-semibold text-red-400">
                {attackStage}
              </p>

            </div>

          </div>

          {attackChain.length > 0 ? (

            <div className="flex flex-wrap items-center gap-3">

              {attackChain.map((stage, index) => (

                <div
                  key={`${stage}-${index}`}
                  className="flex items-center gap-3"
                >

                  <div className="rounded-lg border border-cyan-400/20 bg-slate-950 px-4 py-3">

                    <p className="text-sm font-medium text-cyan-300">
                      {stage}
                    </p>

                  </div>

                  {index <
                    attackChain.length - 1 && (
                    <span className="text-slate-600">
                      →
                    </span>
                  )}

                </div>

              ))}

            </div>

          ) : (

            <p className="text-sm text-slate-500">
              No attack chain identified yet.
            </p>

          )}

        </div>

        {/* BEFORE / DURING / AFTER */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* BEFORE */}

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-5 flex items-center gap-3">

              <div className="rounded-lg bg-blue-500/10 p-2">
                🔵
              </div>

              <div>

                <h3 className="font-semibold">
                  BEFORE
                </h3>

                <p className="text-xs text-slate-500">
                  Prevention & prediction
                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div>

                <p className="text-sm font-medium">
                  Behavior Baseline
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Compare activity against normal environmental behavior.
                </p>

              </div>

              <div>

                <p className="text-sm font-medium">
                  Early Indicators
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Identify suspicious patterns before escalation.
                </p>

              </div>

              <div>

                <p className="text-sm font-medium">
                  Risk Prediction
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Current predicted risk is{' '}
                  <span className="text-cyan-400">
                    {riskScore}/100
                  </span>.
                </p>

              </div>

            </div>

          </section>

          {/* DURING */}

          <section className="rounded-xl border border-cyan-400/20 bg-slate-900 p-6">

            <div className="mb-5 flex items-center gap-3">

              <div className="rounded-lg bg-red-500/10 p-2">
                🔴
              </div>

              <div>

                <h3 className="font-semibold">
                  DURING
                </h3>

                <p className="text-xs text-slate-500">
                  Detection & response
                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div>

                <p className="text-sm font-medium">
                  Real-Time Detection
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Suspicious activity was identified during triage.
                </p>

              </div>

              <div>

                <p className="text-sm font-medium">
                  Attack Chain
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {attackChain.length} attack stages identified.
                </p>

              </div>

              <div>

                <p className="text-sm font-medium">
                  Response
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {recommendations.length} response recommendations generated.
                </p>

              </div>

            </div>

          </section>

          {/* AFTER */}

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-5 flex items-center gap-3">

              <div className="rounded-lg bg-purple-500/10 p-2">
                🟣
              </div>

              <div>

                <h3 className="font-semibold">
                  AFTER
                </h3>

                <p className="text-xs text-slate-500">
                  Investigation & recovery
                </p>

              </div>

            </div>

            <div className="space-y-4">

              <div>

                <p className="text-sm font-medium">
                  Evidence Analysis
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Submitted evidence is available for investigation.
                </p>

              </div>

              <div>

                <p className="text-sm font-medium">
                  Root Cause
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Further forensic investigation is recommended.
                </p>

              </div>

              <div>

                <p className="text-sm font-medium">
                  Recovery
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Follow the recommended containment and recovery actions.
                </p>

              </div>

            </div>

          </section>

        </div>

        {/* FINDINGS + IOCs */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* FINDINGS */}

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-lg font-semibold">
              🔍 Key Findings
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Findings generated by the triage engine.
            </p>

            <div className="mt-5 space-y-3">

              {findings.length > 0 ? (

                findings.map(
                  (finding, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-slate-800 bg-slate-950 p-4"
                    >

                      <div className="flex gap-3">

                        <span className="text-cyan-400">
                          {index + 1}.
                        </span>

                        <p className="text-sm leading-6 text-slate-300">
                          {finding}
                        </p>

                      </div>

                    </div>
                  ),
                )

              ) : (

                <p className="text-sm text-slate-500">
                  No findings generated.
                </p>

              )}

            </div>

          </section>

          {/* IOCS */}

          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-lg font-semibold">
              🔎 Indicators of Compromise
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Indicators submitted with this case.
            </p>

            <div className="mt-5 rounded-lg bg-slate-950 p-4">

              {caseData.iocs ? (

                <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                  {caseData.iocs}
                </pre>

              ) : (

                <p className="text-sm text-slate-600">
                  No IoCs provided.
                </p>

              )}

            </div>

          </section>

        </div>

        {/* TRIAGE RECOMMENDATIONS */}

        <section className="mt-6 rounded-xl border border-cyan-400/20 bg-slate-900 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-cyan-400/10 p-2">
              🤖
            </div>

            <div>

              <h3 className="text-lg font-semibold">
                Triage Recommendations
              </h3>

              <p className="text-xs text-slate-500">
                Recommended actions generated from the case analysis
              </p>

            </div>

          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">

            {recommendations.length > 0 ? (

              recommendations.map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-slate-800 bg-slate-950 p-4"
                  >

                    <p className="text-sm font-medium text-slate-200">
                      {index + 1}. {recommendation}
                    </p>

                  </div>
                ),
              )

            ) : (

              <p className="text-sm text-slate-500">
                No recommendations generated.
              </p>

            )}

          </div>

        </section>

        {/* CASE INFORMATION */}

        <section className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">

          <h3 className="text-lg font-semibold">
            📋 Case Information
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            <div>

              <p className="text-xs text-slate-500">
                Case ID
              </p>

              <p className="mt-1 text-sm font-medium">
                {caseData.caseId}
              </p>

            </div>

            <div>

              <p className="text-xs text-slate-500">
                Incident Type
              </p>

              <p className="mt-1 text-sm font-medium">
                {caseData.incidentType}
              </p>

            </div>

            <div>

              <p className="text-xs text-slate-500">
                Severity
              </p>

              <p className="mt-1 text-sm font-medium">
                {caseData.severity}
              </p>

            </div>

            <div>

              <p className="text-xs text-slate-500">
                Detected At
              </p>

              <p className="mt-1 text-sm font-medium">
                {caseData.detectedAt}
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  )
}

export default TriageDashboard