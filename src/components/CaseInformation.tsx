import { useEffect, useRef, useState } from 'react'
import { extractIoCs } from '../services/iocExtractor'

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

type CaseInformationProps = {
  selectedPortal: string
  selectedEnvironment: string
  onSubmit: (caseData: CaseData) => void
  onBack: () => void
}

function CaseInformation({
  selectedPortal,
  selectedEnvironment,
  onSubmit,
  onBack,
}: CaseInformationProps) {
  const [fileName, setFileName] = useState('')
  const [fileContent, setFileContent] = useState('')

  const [extractedIoCs, setExtractedIoCs] = useState({
    ips: [] as string[],
    urls: [] as string[],
    domains: [] as string[],
    emails: [] as string[],
    hashes: [] as string[],
  })

  // =========================================================
  // AUTO FOCUS FIRST INPUT
  // =========================================================

  const caseIdInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      caseIdInputRef.current?.focus()
    }, 100)

    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  // =========================================================
  // EVIDENCE FILE UPLOAD
  // =========================================================

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setFileName(file.name)

    const reader = new FileReader()

    reader.onload = () => {
      const text = String(reader.result || '')

      setFileContent(text)

      const result = extractIoCs(text)

      setExtractedIoCs(result)
    }

    reader.readAsText(file)
  }

  // =========================================================
  // FORM SUBMIT
  // =========================================================

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const manualIoCs = String(
      formData.get('iocs') || '',
    )

    // Convert extracted IoCs into readable text
    const extractedIoCText = [
      ...extractedIoCs.ips.map(
        (ip) => `IP: ${ip}`,
      ),

      ...extractedIoCs.urls.map(
        (url) => `URL: ${url}`,
      ),

      ...extractedIoCs.domains.map(
        (domain) => `Domain: ${domain}`,
      ),

      ...extractedIoCs.emails.map(
        (email) => `Email: ${email}`,
      ),

      ...extractedIoCs.hashes.map(
        (hash) => `Hash: ${hash}`,
      ),
    ].join('\n')

    const combinedIoCs = [
      manualIoCs,
      extractedIoCText,
    ]
      .filter(Boolean)
      .join('\n')

    const evidenceDescription = [
      String(formData.get('evidence') || ''),

      fileName
        ? `Evidence file uploaded: ${fileName}`
        : '',
    ]
      .filter(Boolean)
      .join('\n')

    onSubmit({
      caseId: String(
        formData.get('caseId') || '',
      ),

      title: String(
        formData.get('title') || '',
      ),

      incidentType: String(
        formData.get('incidentType') || '',
      ),

      severity: String(
        formData.get('severity') || '',
      ),

      description: String(
        formData.get('description') || '',
      ),

      affectedAssets: String(
        formData.get('affectedAssets') || '',
      ),

      detectedAt: String(
        formData.get('detectedAt') || '',
      ),

      iocs: combinedIoCs,

      evidence: evidenceDescription,

      notes: String(
        formData.get('notes') || '',
      ),
    })
  }

  // =========================================================
  // TOTAL IoCs
  // =========================================================

  const totalIoCs =
    extractedIoCs.ips.length +
    extractedIoCs.urls.length +
    extractedIoCs.domains.length +
    extractedIoCs.emails.length +
    extractedIoCs.hashes.length

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">

      <div className="mx-auto max-w-4xl">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-8">

          <div className="mb-3 flex items-center gap-3">

            <span className="text-3xl">
              📋
            </span>

            <div>

              <h1 className="text-3xl font-bold">
                Case Information
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Provide the details required for cyber
                triage and analysis.
              </p>

            </div>

          </div>

          {/* CONTEXT */}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">

            <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">

              <p className="text-xs uppercase tracking-wide text-slate-500">
                Portal
              </p>

              <p className="mt-1 font-medium text-cyan-400">
                {selectedPortal}
              </p>

            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">

              <p className="text-xs uppercase tracking-wide text-slate-500">
                Environment
              </p>

              <p className="mt-1 font-medium text-cyan-400">
                {selectedEnvironment}
              </p>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl md:p-8"
        >

          {/* ================================================= */}
          {/* BASIC INFORMATION */}
          {/* ================================================= */}

          <div className="mb-8">

            <h2 className="mb-4 text-lg font-semibold text-white">
              Basic Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* CASE ID */}

              <div>

                <label
                  htmlFor="case-id"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Case ID
                </label>

                <input
                  ref={caseIdInputRef}
                  id="case-id"
                  name="caseId"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="CASE-2026-001"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

              </div>

              {/* INCIDENT TITLE */}

              <div>

                <label
                  htmlFor="incident-title"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Incident Title
                </label>

                <input
                  id="incident-title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="Suspicious login activity"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* INCIDENT CLASSIFICATION */}
          {/* ================================================= */}

          <div className="mb-8">

            <h2 className="mb-4 text-lg font-semibold text-white">
              Incident Classification
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* INCIDENT TYPE */}

              <div>

                <label
                  htmlFor="incident-type"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Incident Type
                </label>

                <select
                  id="incident-type"
                  name="incidentType"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                >

                  <option value="">
                    Select incident type
                  </option>

                  <option value="Malware">
                    Malware
                  </option>

                  <option value="Phishing">
                    Phishing
                  </option>

                  <option value="Ransomware">
                    Ransomware
                  </option>

                  <option value="Credential Attack">
                    Credential Attack
                  </option>

                  <option value="Data Exfiltration">
                    Data Exfiltration
                  </option>

                  <option value="DDoS">
                    DDoS
                  </option>

                  <option value="Insider Threat">
                    Insider Threat
                  </option>

                  <option value="Unknown / Suspicious">
                    Unknown / Suspicious
                  </option>

                </select>

              </div>

              {/* SEVERITY */}

              <div>

                <label
                  htmlFor="severity"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Severity
                </label>

                <select
                  id="severity"
                  name="severity"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                >

                  <option value="">
                    Select severity
                  </option>

                  <option value="Low">
                    Low
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Critical">
                    Critical
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* INCIDENT DETAILS */}
          {/* ================================================= */}

          <div className="mb-8">

            <h2 className="mb-4 text-lg font-semibold text-white">
              Incident Details
            </h2>

            <div className="space-y-5">

              {/* DESCRIPTION */}

              <div>

                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  required
                  rows={5}
                  placeholder="Describe what happened, when it was detected and any known suspicious activity..."
                  className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

              </div>

              {/* AFFECTED ASSETS */}

              <div>

                <label
                  htmlFor="affected-assets"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Affected Assets
                </label>

                <input
                  id="affected-assets"
                  name="affectedAssets"
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Server-01, user@example.com, 10.0.0.25"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

              </div>

              {/* DETECTED TIME */}

              <div>

                <label
                  htmlFor="detected-at"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Date / Time Detected
                </label>

                <input
                  id="detected-at"
                  name="detectedAt"
                  type="datetime-local"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* MANUAL IoCs */}
          {/* ================================================= */}

          <div className="mb-8">

            <h2 className="mb-4 text-lg font-semibold text-white">
              Indicators of Compromise
            </h2>

            <p className="mb-3 text-sm text-slate-500">
              You can manually enter IP addresses, domains,
              URLs, file hashes or email addresses.
            </p>

            <textarea
              id="iocs"
              name="iocs"
              rows={5}
              placeholder={`Example:
185.220.101.45
malicious-example.com
https://malicious-example.com/login
attacker@example.com
5d41402abc4b2a76b9719d911017c592`}
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />

          </div>

          {/* ================================================= */}
          {/* EVIDENCE DESCRIPTION */}
          {/* ================================================= */}

          <div className="mb-8">

            <h2 className="mb-4 text-lg font-semibold text-white">
              Evidence Available
            </h2>

            <textarea
              id="evidence"
              name="evidence"
              rows={4}
              placeholder="Describe available logs, screenshots, memory dumps, network captures, files or other evidence..."
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />

          </div>

          {/* ================================================= */}
          {/* FILE UPLOAD */}
          {/* ================================================= */}

          <div className="mb-8">

            <h2 className="mb-4 text-lg font-semibold text-white">
              📎 Upload Evidence
            </h2>

            <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950 p-6">

              <label className="flex cursor-pointer flex-col items-center justify-center">

                <div className="mb-3 text-4xl">
                  📄
                </div>

                <p className="text-sm font-medium text-slate-300">
                  Upload a log or evidence file
                </p>

                <p className="mt-1 text-xs text-slate-600">
                  TXT, LOG, CSV or JSON
                </p>

                <input
                  type="file"
                  accept=".txt,.log,.csv,.json,text/plain,application/json,text/csv"
                  onChange={handleFileUpload}
                  className="mt-5 block w-full max-w-xs text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-slate-950 hover:file:bg-cyan-400"
                />

              </label>

              {/* FILE INFORMATION */}

              {fileName && (

                <div className="mt-5 rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">

                  <p className="text-sm font-medium text-cyan-300">
                    ✓ File loaded
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {fileName}
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    {fileContent.length.toLocaleString()} characters analyzed
                  </p>

                </div>

              )}

            </div>

          </div>

          {/* ================================================= */}
          {/* EXTRACTED IoCs */}
          {/* ================================================= */}

          {fileName && (

            <div className="mb-8">

              <div className="mb-4 flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-semibold text-white">
                    🔍 Automatically Extracted IoCs
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Indicators detected inside the uploaded evidence.
                  </p>

                </div>

                <div className="rounded-lg bg-cyan-500/10 px-3 py-2">

                  <span className="text-sm font-semibold text-cyan-400">
                    {totalIoCs}
                  </span>

                  <span className="ml-1 text-xs text-slate-500">
                    detected
                  </span>

                </div>

              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <IoCGroup
                  title="IP Addresses"
                  icon="🌐"
                  values={extractedIoCs.ips}
                />

                <IoCGroup
                  title="URLs"
                  icon="🔗"
                  values={extractedIoCs.urls}
                />

                <IoCGroup
                  title="Domains"
                  icon="🌍"
                  values={extractedIoCs.domains}
                />

                <IoCGroup
                  title="Email Addresses"
                  icon="📧"
                  values={extractedIoCs.emails}
                />

                <IoCGroup
                  title="File Hashes"
                  icon="#️⃣"
                  values={extractedIoCs.hashes}
                />

              </div>

              {totalIoCs === 0 && (

                <div className="mt-4 rounded-lg border border-yellow-400/20 bg-yellow-400/5 p-4">

                  <p className="text-sm text-yellow-300">
                    No recognizable IoCs were found in this file.
                  </p>

                </div>

              )}

            </div>

          )}

          {/* ================================================= */}
          {/* NOTES */}
          {/* ================================================= */}

          <div className="mb-8">

            <h2 className="mb-4 text-lg font-semibold text-white">
              Additional Notes
            </h2>

            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Add any additional information that may help the investigation..."
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />

          </div>

          {/* ================================================= */}
          {/* ACTIONS */}
          {/* ================================================= */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-between">

            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-slate-700 px-6 py-3 font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              ← Back
            </button>

            <button
              type="submit"
              className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              🛡️ Start Cyber Triage
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

// =========================================================
// IoC GROUP COMPONENT
// =========================================================

type IoCGroupProps = {
  title: string
  icon: string
  values: string[]
}

function IoCGroup({
  title,
  icon,
  values,
}: IoCGroupProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">

      <div className="mb-3 flex items-center gap-2">

        <span>
          {icon}
        </span>

        <h3 className="text-sm font-semibold text-slate-300">
          {title}
        </h3>

        <span className="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-500">
          {values.length}
        </span>

      </div>

      {values.length > 0 ? (

        <div className="space-y-2">

          {values.map((value, index) => (

            <div
              key={`${value}-${index}`}
              className="rounded-md border border-slate-800 bg-slate-900 px-3 py-2"
            >

              <code className="break-all text-xs text-cyan-300">
                {value}
              </code>

            </div>

          ))}

        </div>

      ) : (

        <p className="text-xs text-slate-600">
          None detected
        </p>

      )}

    </div>
  )
}

export default CaseInformation