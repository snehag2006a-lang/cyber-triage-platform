import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Database will be created at:
// server/src/db/cyber-triage.db
const dbPath = path.join(__dirname, 'cyber-triage.db')

const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// ---------------------------------
// Cases Table
// ---------------------------------

db.exec(`
  CREATE TABLE IF NOT EXISTS cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    case_id TEXT NOT NULL UNIQUE,

    portal TEXT,
    environment TEXT,

    title TEXT NOT NULL,
    incident_type TEXT,
    severity TEXT,

    description TEXT,
    affected_assets TEXT,
    detected_at TEXT,

    iocs TEXT,
    evidence TEXT,
    notes TEXT,

    risk_score INTEGER,
    threat_level TEXT,
    confidence INTEGER,
    priority TEXT,

    attack_stage TEXT,
    attack_chain TEXT,
    findings TEXT,
    recommendations TEXT,

    created_at TEXT NOT NULL
  )
`)

console.log('💾 SQLite database initialized')

export default db