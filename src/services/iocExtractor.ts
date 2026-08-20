export type ExtractedIoCs = {
  ips: string[]
  urls: string[]
  domains: string[]
  emails: string[]
  hashes: string[]
}

export function extractIoCs(text: string): ExtractedIoCs {
  const ips = [
    ...new Set(
      text.match(
        /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
      ) || [],
    ),
  ]

  const urls = [
    ...new Set(
      text.match(
        /https?:\/\/[^\s"'<>]+/gi,
      ) || [],
    ),
  ]

  const emails = [
    ...new Set(
      text.match(
        /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
      ) || [],
    ),
  ]

  const hashes = [
    ...new Set(
      text.match(
        /\b[a-fA-F0-9]{32}\b|\b[a-fA-F0-9]{40}\b|\b[a-fA-F0-9]{64}\b/g,
      ) || [],
    ),
  ]

  const domains = [
    ...new Set(
      text.match(
        /\b(?:[a-zA-Z0-9-]+\.)+(?:com|net|org|io|co|in|info|biz|xyz|dev)\b/gi,
      ) || [],
    ),
  ].filter((domain) => {
    return !urls.some((url) => url.includes(domain))
  })

  return {
    ips,
    urls,
    domains,
    emails,
    hashes,
  }
}