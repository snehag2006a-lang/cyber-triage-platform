export type IoCType =
  | 'IP Address'
  | 'Domain'
  | 'URL'
  | 'Email'
  | 'File Hash'

export type ThreatIntelResult = {
  value: string
  type: IoCType
  reputation: 'Malicious' | 'Suspicious' | 'Clean' | 'Unknown'
  riskScore: number
  reason: string
}

// Demo/local threat intelligence database.
// This keeps the prototype completely free and offline.
const knownThreats: Record<
  string,
  {
    reputation: 'Malicious' | 'Suspicious'
    riskScore: number
    reason: string
  }
> = {
  '185.220.101.45': {
    reputation: 'Malicious',
    riskScore: 90,
    reason: 'Known malicious IP in the local demonstration intelligence set.',
  },

  '45.155.205.233': {
    reputation: 'Suspicious',
    riskScore: 70,
    reason: 'Suspicious authentication source detected in the local demonstration intelligence set.',
  },

  'malicious-example.com': {
    reputation: 'Malicious',
    riskScore: 95,
    reason: 'Known malicious domain in the local demonstration intelligence set.',
  },

  'login-example-security.com': {
    reputation: 'Suspicious',
    riskScore: 75,
    reason: 'Suspicious credential-harvesting domain in the local demonstration intelligence set.',
  },

  '5d41402abc4b2a76b9719d911017c592': {
    reputation: 'Malicious',
    riskScore: 95,
    reason: 'Known malicious file hash in the local demonstration intelligence set.',
  },
}

function detectIoCType(value: string): IoCType {
  if (
    /^(?:\d{1,3}\.){3}\d{1,3}$/.test(value)
  ) {
    return 'IP Address'
  }

  if (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    return 'Email'
  }

  if (
    /^https?:\/\//i.test(value)
  ) {
    return 'URL'
  }

  if (
    /^[a-fA-F0-9]{32}$/.test(value) ||
    /^[a-fA-F0-9]{40}$/.test(value) ||
    /^[a-fA-F0-9]{64}$/.test(value)
  ) {
    return 'File Hash'
  }

  return 'Domain'
}

export function checkIoC(
  value: string,
): ThreatIntelResult {
  const normalizedValue = value
    .trim()
    .toLowerCase()

  const type = detectIoCType(normalizedValue)

  const threat = knownThreats[normalizedValue]

  if (threat) {
    return {
      value,
      type,
      reputation: threat.reputation,
      riskScore: threat.riskScore,
      reason: threat.reason,
    }
  }

  return {
    value,
    type,
    reputation: 'Unknown',
    riskScore: 0,
    reason:
      'No matching intelligence found in the local demonstration database.',
  }
}

export function analyzeIoCs(
  iocs: string[],
): ThreatIntelResult[] {
  return iocs
    .map((ioc) => ioc.trim())
    .filter(Boolean)
    .map(checkIoC)
}