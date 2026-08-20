import { analyzeIoCs } from './threatIntelligence'

export type TriageInput = {
  incidentType: string
  severity: string
  description: string
  affectedAssets: string
  iocs: string
  evidence: string
  environment: string
}

export type TriageResult = {
  riskScore: number
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  confidence: number
  priority: 'P3' | 'P2' | 'P1'
  attackStage: string
  attackChain: string[]
  findings: string[]
  recommendations: string[]
}

export function analyzeCase(
  input: TriageInput,
): TriageResult {
  let score = 0

  const findings: string[] = []
  const recommendations: string[] = []
  const attackChain: string[] = []

  const text = `
    ${input.incidentType}
    ${input.description}
    ${input.affectedAssets}
    ${input.iocs}
    ${input.evidence}
  `.toLowerCase()

  // -----------------------------
  // Severity scoring
  // -----------------------------

  const severityScores: Record<string, number> = {
    Low: 15,
    Medium: 30,
    High: 45,
    Critical: 60,
  }

  score += severityScores[input.severity] || 20

  // -----------------------------
  // Incident type
  // -----------------------------

  if (input.incidentType === 'Credential Attack') {
    score += 15

    attackChain.push('Initial Access')
    attackChain.push('Credential Compromise')

    findings.push(
      'Suspicious authentication activity indicates possible credential compromise.',
    )

    recommendations.push(
      'Reset credentials for affected accounts.',
    )

    recommendations.push(
      'Revoke active sessions and authentication tokens.',
    )
  }

  if (input.incidentType === 'Phishing') {
    score += 12

    attackChain.push('Initial Access')
    attackChain.push('User Execution')

    findings.push(
      'The incident may involve social engineering or malicious communication.',
    )

    recommendations.push(
      'Block malicious domains, URLs or sender addresses.',
    )
  }

  if (input.incidentType === 'Malware') {
    score += 20

    attackChain.push('Execution')
    attackChain.push('Persistence')

    findings.push(
      'Malicious software activity may be present on affected assets.',
    )

    recommendations.push(
      'Isolate suspected infected endpoints.',
    )

    recommendations.push(
      'Collect malware samples and endpoint telemetry for analysis.',
    )
  }

  if (input.incidentType === 'Ransomware') {
    score += 30

    attackChain.push('Execution')
    attackChain.push('Impact')

    findings.push(
      'Potential ransomware activity detected with possible business impact.',
    )

    recommendations.push(
      'Immediately isolate affected systems from the network.',
    )

    recommendations.push(
      'Preserve forensic evidence before attempting recovery.',
    )
  }

  if (input.incidentType === 'Data Exfiltration') {
    score += 25

    attackChain.push('Collection')
    attackChain.push('Exfiltration')

    findings.push(
      'Potential unauthorized transfer of sensitive information detected.',
    )

    recommendations.push(
      'Investigate outbound network connections and unusual data transfers.',
    )
  }

  if (input.incidentType === 'DDoS') {
    score += 20

    attackChain.push('Initial Access')
    attackChain.push('Impact')

    findings.push(
      'Potential denial-of-service activity may affect service availability.',
    )

    recommendations.push(
      'Apply traffic filtering and rate limiting.',
    )
  }

  if (input.incidentType === 'Insider Threat') {
    score += 20

    attackChain.push('Collection')
    attackChain.push('Exfiltration')

    findings.push(
      'User activity may indicate potential insider-driven security risk.',
    )

    recommendations.push(
      'Review privileged user activity and access history.',
    )
  }

  // -----------------------------
  // IoC presence
  // -----------------------------

  if (input.iocs.trim()) {
    score += 8

    findings.push(
      'Indicators of compromise were supplied for investigation.',
    )

    recommendations.push(
      'Enrich and correlate the submitted indicators with security logs.',
    )
  }

  // -----------------------------
  // Threat Intelligence
  // -----------------------------

  const rawIoCs = input.iocs
    .split(/[\n,\s]+/)
    .map((value) => value.trim())
    .filter(Boolean)

  const threatIntelResults = analyzeIoCs(rawIoCs)

  const maliciousIoCs = threatIntelResults.filter(
    (result) => result.reputation === 'Malicious',
  )

  const suspiciousIoCs = threatIntelResults.filter(
    (result) => result.reputation === 'Suspicious',
  )

  // Malicious indicators
  if (maliciousIoCs.length > 0) {
    const highestRisk = Math.max(
      ...maliciousIoCs.map(
        (result) => result.riskScore,
      ),
    )

    // Add a controlled contribution rather than
    // directly adding the entire reputation score.
    score += Math.min(
      25,
      Math.round(highestRisk / 4),
    )

    findings.push(
      `${maliciousIoCs.length} malicious indicator${
        maliciousIoCs.length > 1 ? 's were' : ' was'
      } identified by threat intelligence.`,
    )

    recommendations.push(
      'Immediately investigate and contain assets associated with malicious indicators.',
    )
  }

  // Suspicious indicators
  if (suspiciousIoCs.length > 0) {
    score += Math.min(
      15,
      suspiciousIoCs.length * 5,
    )

    findings.push(
      `${suspiciousIoCs.length} suspicious indicator${
        suspiciousIoCs.length > 1 ? 's were' : ' was'
      } identified by threat intelligence.`,
    )

    recommendations.push(
      'Investigate suspicious indicators and correlate them with available security telemetry.',
    )
  }

  // -----------------------------
  // Multiple IP indicators
  // -----------------------------

  const ipMatches = input.iocs.match(
    /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
  )

  if (ipMatches && ipMatches.length >= 2) {
    score += 5

    findings.push(
      `${ipMatches.length} IP indicators were identified in the submitted case.`,
    )
  }

  // -----------------------------
  // Suspicious keywords
  // -----------------------------

  const suspiciousKeywords = [
    'unusual',
    'unknown',
    'suspicious',
    'unauthorized',
    'failed login',
    'successful login',
    'outside normal',
    'compromised',
    'attack',
    'malicious',
  ]

  const detectedKeywords =
    suspiciousKeywords.filter((keyword) =>
      text.includes(keyword),
    )

  if (detectedKeywords.length > 0) {
    score += Math.min(
      detectedKeywords.length * 3,
      15,
    )

    findings.push(
      `${detectedKeywords.length} suspicious behavior indicators were detected in the case description.`,
    )
  }

  // -----------------------------
  // Environment risk
  // -----------------------------

  if (input.environment === 'Cloud') {
    score += 5

    findings.push(
      'Cloud environment selected; identity and access activity should receive additional scrutiny.',
    )

    recommendations.push(
      'Review cloud identity, access and audit logs.',
    )
  }

  if (input.environment === 'Enterprise') {
    score += 3
  }

  if (input.environment === 'Network') {
    score += 4

    recommendations.push(
      'Review network flows and suspicious outbound connections.',
    )
  }

  if (input.environment === 'Endpoint') {
    score += 4

    recommendations.push(
      'Review endpoint telemetry and process activity.',
    )
  }

  if (input.environment === 'Hybrid') {
    score += 6

    recommendations.push(
      'Correlate identity, endpoint, network and cloud telemetry.',
    )
  }

  // -----------------------------
  // Evidence availability
  // -----------------------------

  if (input.evidence.trim()) {
    score += 4

    findings.push(
      'Investigation evidence is available for further analysis.',
    )
  } else {
    recommendations.push(
      'Collect and preserve relevant logs and forensic evidence.',
    )
  }

  // -----------------------------
  // Cap score
  // -----------------------------

  score = Math.min(score, 100)

  // -----------------------------
  // Threat level
  // -----------------------------

  let threatLevel: TriageResult['threatLevel']

  if (score >= 85) {
    threatLevel = 'CRITICAL'
  } else if (score >= 65) {
    threatLevel = 'HIGH'
  } else if (score >= 40) {
    threatLevel = 'MEDIUM'
  } else {
    threatLevel = 'LOW'
  }

  // -----------------------------
  // Priority
  // -----------------------------

  let priority: TriageResult['priority']

  if (score >= 80) {
    priority = 'P1'
  } else if (score >= 50) {
    priority = 'P2'
  } else {
    priority = 'P3'
  }

  // -----------------------------
  // Attack stage
  // -----------------------------

  let attackStage = 'Detection'

  if (attackChain.length > 0) {
    attackStage =
      attackChain[attackChain.length - 1]
  }

  // -----------------------------
  // Confidence
  // -----------------------------

  let confidence = 70

  if (input.description.trim()) {
    confidence += 5
  }

  if (input.iocs.trim()) {
    confidence += 5
  }

  if (input.evidence.trim()) {
    confidence += 5
  }

  if (input.affectedAssets.trim()) {
    confidence += 5
  }

  if (threatIntelResults.length > 0) {
    confidence += 5
  }

  confidence = Math.min(confidence, 95)

  // -----------------------------
  // Default recommendation
  // -----------------------------

  if (recommendations.length === 0) {
    recommendations.push(
      'Continue monitoring the affected environment for additional indicators.',
    )
  }

  if (findings.length === 0) {
    findings.push(
      'No strong suspicious indicators were identified from the submitted information.',
    )
  }

  return {
    riskScore: score,
    threatLevel,
    confidence,
    priority,
    attackStage,
    attackChain,
    findings,
    recommendations,
  }
}