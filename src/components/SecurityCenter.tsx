type SecurityCenterProps = {
  selectedEnvironment: string
  onOpenCase: () => void
  onDigitalTwin: () => void
}

function SecurityCenter({
  selectedEnvironment,
  onOpenCase,
  onDigitalTwin,
}: SecurityCenterProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/90">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
              🛡️
            </div>

            <div>
              <h1 className="font-bold">
                Universal Cyber Intelligence Platform
              </h1>

              <p className="text-xs text-slate-500">
                Predict. Prevent. Detect. Simulate. Respond. Investigate. Learn.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-xs text-slate-500">
                ENVIRONMENT
              </p>

              <p className="text-sm font-medium text-cyan-400">
                {selectedEnvironment}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800">
              👤
            </div>

          </div>
        </div>
      </header>


      <div className="mx-auto flex max-w-[1600px]">

        {/* SIDEBAR */}
        <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r border-slate-800 bg-slate-900/40 p-4 lg:block">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            Security Center
          </p>

          <nav className="space-y-1">

            <NavItem icon="▦" label="Overview" active />

            <NavItem icon="🌐" label="Environment" />

            <NavItem icon="🖥️" label="Assets" />

            <NavItem
              icon="🧬"
              label="Digital Twin"
              onClick={onDigitalTwin}
            />

            <NavItem icon="📡" label="Live Monitoring" />

          </nav>


          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            BEFORE
          </p>

          <nav className="space-y-1">
            <NavItem icon="📊" label="Behaviour Baseline" />
            <NavItem icon="⚠️" label="Early Warnings" />
            <NavItem icon="🎯" label="Risk Prediction" />
            <NavItem icon="🔮" label="What-If Analysis" />
            <NavItem icon="🧪" label="Attack Simulation" />
            <NavItem icon="🛡️" label="Prevention" />
          </nav>


          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            DURING
          </p>

          <nav className="space-y-1">
            <NavItem icon="🚨" label="Active Threats" />
            <NavItem icon="⚔️" label="Attack Chain" />
            <NavItem icon="📈" label="Risk Escalation" />
            <NavItem icon="💥" label="Blast Radius" />
            <NavItem icon="🧭" label="Response" />
          </nav>


          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            AFTER
          </p>

          <nav className="space-y-1">
            <NavItem icon="📁" label="Evidence" />
            <NavItem icon="🔍" label="Forensic Triage" />
            <NavItem icon="🕸️" label="Evidence Graph" />
            <NavItem icon="⚠️" label="Evidence Gaps" />
            <NavItem icon="⭐" label="Evidence Prioritization" />
            <NavItem icon="🧠" label="Hypotheses" />
            <NavItem icon="🕒" label="Timeline" />
            <NavItem icon="📝" label="Investigation" />
          </nav>


          <div className="mt-8 border-t border-slate-800 pt-4">
            <NavItem icon="📄" label="Reports" />
            <NavItem
              icon="📂"
              label="Cases"
              onClick={onOpenCase}
            />
            <NavItem icon="🔔" label="Alerts" />
            <NavItem icon="⚙️" label="Settings" />
          </div>

        </aside>


        {/* MAIN CONTENT */}
        <main className="min-w-0 flex-1 p-6">

          {/* TITLE */}

          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <div className="mb-2 flex items-center gap-2 text-xs">
                <span className="text-cyan-400">
                  SECURITY CENTER
                </span>

                <span className="text-slate-700">
                  /
                </span>

                <span className="text-slate-500">
                  {selectedEnvironment}
                </span>
              </div>

              <h2 className="text-3xl font-bold">
                Security Overview
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Understand your environment, identify early warning signals,
                and respond intelligently to emerging cyber risk.
              </p>

            </div>

            <button
              onClick={onOpenCase}
              className="rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              + Create Investigation Case
            </button>

          </div>


          {/* STATUS BAR */}

          <div className="mb-6 flex flex-wrap items-center gap-3">

            <StatusBadge
              label="SYNTHETIC DATA"
              color="blue"
            />

            <StatusBadge
              label="ENVIRONMENT ACTIVE"
              color="green"
            />

            <StatusBadge
              label="MONITORING"
              color="green"
            />

            <span className="text-xs text-slate-600">
              Demo environment • No production systems connected
            </span>

          </div>


          {/* METRIC CARDS */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <MetricCard
              label="Cyber Risk Score"
              value="42"
              suffix="/100"
              description="Guarded"
              icon="◈"
              valueClass="text-yellow-400"
            />

            <MetricCard
              label="Assets Monitored"
              value="24"
              description="3 critical assets"
              icon="▣"
              valueClass="text-cyan-400"
            />

            <MetricCard
              label="Active Alerts"
              value="04"
              description="1 high severity"
              icon="⚠"
              valueClass="text-orange-400"
            />

            <MetricCard
              label="Open Cases"
              value="02"
              description="1 under investigation"
              icon="◫"
              valueClass="text-purple-400"
            />

          </div>


          {/* MAIN GRID */}

          <div className="mt-6 grid gap-6 xl:grid-cols-3">

            {/* ENVIRONMENT HEALTH */}

            <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Environment Intelligence
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    {selectedEnvironment} Health
                  </h3>
                </div>

                <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs text-green-400">
                  NORMAL
                </span>

              </div>


              <div className="mt-8 grid gap-6 md:grid-cols-3">

                <HealthItem
                  label="Network"
                  value="Healthy"
                  percentage="92%"
                />

                <HealthItem
                  label="Endpoints"
                  value="Healthy"
                  percentage="87%"
                />

                <HealthItem
                  label="Identity"
                  value="Guarded"
                  percentage="74%"
                />

              </div>


              <div className="mt-8">

                <div className="mb-3 flex justify-between text-xs">
                  <span className="text-slate-500">
                    Overall environment health
                  </span>

                  <span className="text-cyan-400">
                    84%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full w-[84%] rounded-full bg-cyan-400"
                  />

                </div>

              </div>

            </section>


            {/* DIGITAL TWIN */}

            <section className="rounded-xl border border-cyan-400/20 bg-slate-900 p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    Signature Feature
                  </p>

                  <h3 className="mt-2 text-xl font-semibold">
                    Cyber Digital Twin
                  </h3>

                </div>

                <span className="text-2xl">
                  🧬
                </span>

              </div>


              <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 p-5">

                <div className="flex flex-col items-center gap-3 text-xs">

                  <TwinNode label="INTERNET" status="normal" />

                  <span className="text-slate-700">
                    ↓
                  </span>

                  <TwinNode label="FIREWALL" status="normal" />

                  <span className="text-slate-700">
                    ↓
                  </span>

                  <div className="flex gap-4">

                    <TwinNode
                      label="SERVER"
                      status="normal"
                    />

                    <TwinNode
                      label="ENDPOINT"
                      status="warning"
                    />

                  </div>

                </div>

              </div>


              <button
                onClick={onDigitalTwin}
                className="mt-5 w-full rounded-lg border border-cyan-400/30 py-2.5 text-sm font-medium text-cyan-400 transition hover:bg-cyan-400/10"
              >
                Open Digital Twin →
              </button>

            </section>

          </div>


          {/* BEFORE / DURING / AFTER */}

          <div className="mt-6 grid gap-6 lg:grid-cols-3">

            <LifecycleCard
              phase="BEFORE"
              subtitle="Early Warning & Prevention"
              icon="🔵"
              items={[
                "Behaviour Baseline",
                "Early Threat Indicators",
                "Risk Prediction",
                "What-If Analysis",
                "Attack Simulation",
              ]}
            />

            <LifecycleCard
              phase="DURING"
              subtitle="Real-Time Threat Intelligence"
              icon="🔴"
              highlighted
              items={[
                "Live Monitoring",
                "Threat Correlation",
                "Attack Chain",
                "Risk Escalation",
                "Response Planner",
              ]}
            />

            <LifecycleCard
              phase="AFTER"
              subtitle="Digital Forensic Investigation"
              icon="🟣"
              items={[
                "Evidence Collection",
                "Forensic Triage",
                "Evidence Graph",
                "Evidence Gaps",
                "Investigation Report",
              ]}
            />

          </div>


          {/* RISK FACTORS + RECENT EVENTS */}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* RISK FACTORS */}

            <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

              <div className="mb-5">

                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Risk Intelligence
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  Top Risk Factors
                </h3>

              </div>


              <div className="space-y-4">

                <RiskFactor
                  name="Unusual login behaviour"
                  percentage={72}
                />

                <RiskFactor
                  name="Unknown device"
                  percentage={61}
                />

                <RiskFactor
                  name="Activity outside baseline"
                  percentage={48}
                />

                <RiskFactor
                  name="External connection"
                  percentage={37}
                />

              </div>

            </section>


            {/* RECENT EVENTS */}

            <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">

              <div className="mb-5 flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Monitoring
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    Recent Events
                  </h3>

                </div>

                <span className="rounded-full bg-green-400/10 px-2.5 py-1 text-xs text-green-400">
                  LIVE
                </span>

              </div>


              <div className="space-y-4">

                <EventItem
                  time="10:42:13"
                  text="Normal authentication observed"
                  type="Authentication"
                  severity="LOW"
                />

                <EventItem
                  time="10:42:18"
                  text="New device detected"
                  type="Device"
                  severity="MEDIUM"
                />

                <EventItem
                  time="10:42:23"
                  text="Behaviour deviation detected"
                  type="Behaviour"
                  severity="MEDIUM"
                />

                <EventItem
                  time="10:42:29"
                  text="External connection observed"
                  type="Network"
                  severity="HIGH"
                />

              </div>

            </section>

          </div>


          {/* USP */}

          <section className="mt-6 rounded-xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/5 via-slate-900 to-purple-500/5 p-8 text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              FROM EARLY WARNING TO DIGITAL EVIDENCE
            </p>

            <h3 className="mx-auto mt-4 max-w-3xl text-2xl font-bold">
              Understand your environment.
              Detect early signals.
              Safely simulate potential attack paths.
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              Measure potential impact, guide response when risk emerges,
              preserve evidence, and investigate with context.
            </p>

          </section>

        </main>

      </div>

    </div>
  )
}


/* ========================================================= */
/* NAV ITEM */
/* ========================================================= */

function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: string
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
        active
          ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
          : "text-slate-500 hover:bg-slate-800 hover:text-slate-200"
      }`}
    >
      <span className="w-5 text-center">
        {icon}
      </span>

      <span>
        {label}
      </span>
    </button>
  )
}


/* ========================================================= */
/* METRIC CARD */
/* ========================================================= */

function MetricCard({
  label,
  value,
  suffix,
  description,
  icon,
  valueClass,
}: {
  label: string
  value: string
  suffix?: string
  description: string
  icon: string
  valueClass: string
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      <div className="flex items-start justify-between">

        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <span className="text-slate-600">
          {icon}
        </span>

      </div>

      <div className="mt-4 flex items-end gap-2">

        <span className={`text-3xl font-bold ${valueClass}`}>
          {value}
        </span>

        {suffix && (
          <span className="mb-1 text-xs text-slate-600">
            {suffix}
          </span>
        )}

      </div>

      <p className="mt-2 text-xs text-slate-600">
        {description}
      </p>

    </div>
  )
}


/* ========================================================= */
/* HEALTH ITEM */
/* ========================================================= */

function HealthItem({
  label,
  value,
  percentage,
}: {
  label: string
  value: string
  percentage: string
}) {
  return (
    <div>

      <div className="flex justify-between">

        <span className="text-sm text-slate-400">
          {label}
        </span>

        <span className="text-xs text-green-400">
          {value}
        </span>

      </div>

      <div className="mt-3 h-1.5 rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-green-400"
          style={{ width: percentage }}
        />

      </div>

      <p className="mt-2 text-xs text-slate-600">
        {percentage} health
      </p>

    </div>
  )
}


/* ========================================================= */
/* DIGITAL TWIN NODE */
/* ========================================================= */

function TwinNode({
  label,
  status,
}: {
  label: string
  status: "normal" | "warning"
}) {
  return (
    <div
      className={`rounded-md border px-3 py-2 ${
        status === "normal"
          ? "border-green-400/20 bg-green-400/5 text-green-400"
          : "border-yellow-400/20 bg-yellow-400/5 text-yellow-400"
      }`}
    >
      <span className="mr-1">
        {status === "normal" ? "●" : "●"}
      </span>

      {label}
    </div>
  )
}


/* ========================================================= */
/* LIFECYCLE CARD */
/* ========================================================= */

function LifecycleCard({
  phase,
  subtitle,
  icon,
  items,
  highlighted = false,
}: {
  phase: string
  subtitle: string
  icon: string
  items: string[]
  highlighted?: boolean
}) {
  return (
    <section
      className={`rounded-xl border bg-slate-900 p-6 ${
        highlighted
          ? "border-cyan-400/20"
          : "border-slate-800"
      }`}
    >

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-lg bg-slate-950 p-2">
          {icon}
        </div>

        <div>

          <h3 className="font-semibold">
            {phase}
          </h3>

          <p className="text-xs text-slate-500">
            {subtitle}
          </p>

        </div>

      </div>

      <div className="space-y-2">

        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-slate-400"
          >
            {item}
          </div>
        ))}

      </div>

    </section>
  )
}


/* ========================================================= */
/* RISK FACTOR */
/* ========================================================= */

function RiskFactor({
  name,
  percentage,
}: {
  name: string
  percentage: number
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between">

        <span className="text-sm text-slate-400">
          {name}
        </span>

        <span className="text-xs text-slate-500">
          +{percentage}
        </span>

      </div>

      <div className="h-1.5 rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-orange-400"
          style={{ width: `${percentage}%` }}
        />

      </div>

    </div>
  )
}


/* ========================================================= */
/* EVENT ITEM */
/* ========================================================= */

function EventItem({
  time,
  text,
  type,
  severity,
}: {
  time: string
  text: string
  type: string
  severity: string
}) {
  const severityClass =
    severity === "HIGH"
      ? "text-red-400"
      : severity === "MEDIUM"
        ? "text-yellow-400"
        : "text-green-400"

  return (
    <div className="flex gap-3 border-b border-slate-800 pb-4 last:border-0 last:pb-0">

      <div className="pt-1">

        <span
          className={`block h-2 w-2 rounded-full ${
            severity === "HIGH"
              ? "bg-red-400"
              : severity === "MEDIUM"
                ? "bg-yellow-400"
                : "bg-green-400"
          }`}
        />

      </div>

      <div className="min-w-0 flex-1">

        <div className="flex flex-wrap items-center gap-2">

          <span className="font-mono text-xs text-slate-600">
            {time}
          </span>

          <span className={`text-[10px] font-semibold ${severityClass}`}>
            {severity}
          </span>

        </div>

        <p className="mt-1 text-sm text-slate-300">
          {text}
        </p>

        <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-600">
          {type}
        </p>

      </div>

    </div>
  )
}


/* ========================================================= */
/* STATUS BADGE */
/* ========================================================= */

function StatusBadge({
  label,
  color,
}: {
  label: string
  color: "blue" | "green"
}) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-[10px] font-semibold tracking-wide ${
        color === "green"
          ? "border-green-400/20 bg-green-400/10 text-green-400"
          : "border-blue-400/20 bg-blue-400/10 text-blue-400"
      }`}
    >
      {label}
    </span>
  )
}

export default SecurityCenter