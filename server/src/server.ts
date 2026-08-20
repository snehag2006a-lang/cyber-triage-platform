import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db/database.js'

dotenv.config()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// ---------------------------------
// Health Check
// ---------------------------------

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Cyber Triage API is running',
    timestamp: new Date().toISOString(),
  })
})

// ---------------------------------
// Create Case
// ---------------------------------

app.post('/api/cases', (req, res) => {
  try {
    const {
      portal,
      environment,
      case: caseData,
      triageResult,
    } = req.body

    if (!caseData?.caseId || !caseData?.title) {
      return res.status(400).json({
        success: false,
        message: 'caseId and title are required',
      })
    }

    const insertCase = db.prepare(`
      INSERT INTO cases (
        case_id,
        portal,
        environment,
        title,
        incident_type,
        severity,
        description,
        affected_assets,
        detected_at,
        iocs,
        evidence,
        notes,
        risk_score,
        threat_level,
        confidence,
        priority,
        attack_stage,
        attack_chain,
        findings,
        recommendations,
        created_at
      )
      VALUES (
        @caseId,
        @portal,
        @environment,
        @title,
        @incidentType,
        @severity,
        @description,
        @affectedAssets,
        @detectedAt,
        @iocs,
        @evidence,
        @notes,
        @riskScore,
        @threatLevel,
        @confidence,
        @priority,
        @attackStage,
        @attackChain,
        @findings,
        @recommendations,
        @createdAt
      )
    `)

    const result = insertCase.run({
      caseId: caseData.caseId,
      portal: portal || '',
      environment: environment || '',
      title: caseData.title,
      incidentType: caseData.incidentType || '',
      severity: caseData.severity || '',
      description: caseData.description || '',
      affectedAssets: caseData.affectedAssets || '',
      detectedAt: caseData.detectedAt || '',
      iocs: caseData.iocs || '',
      evidence: caseData.evidence || '',
      notes: caseData.notes || '',

      riskScore: triageResult?.riskScore ?? null,
      threatLevel: triageResult?.threatLevel ?? null,
      confidence: triageResult?.confidence ?? null,
      priority: triageResult?.priority ?? null,
      attackStage: triageResult?.attackStage ?? null,

      attackChain: JSON.stringify(
        triageResult?.attackChain || [],
      ),

      findings: JSON.stringify(
        triageResult?.findings || [],
      ),

      recommendations: JSON.stringify(
        triageResult?.recommendations || [],
      ),

      createdAt: new Date().toISOString(),
    })

    console.log('==============================')
    console.log('CASE SAVED TO DATABASE')
    console.log('==============================')
    console.log('Case ID:', caseData.caseId)
    console.log('Database ID:', result.lastInsertRowid)

    return res.status(201).json({
      success: true,
      message: 'Case saved successfully',
      databaseId: result.lastInsertRowid,
    })
  } catch (error) {
    console.error('Database error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to save case',
    })
  }
})

// ---------------------------------
// Get All Cases
// ---------------------------------

app.get('/api/cases', (_req, res) => {
  try {
    const cases = db
      .prepare(`
        SELECT *
        FROM cases
        ORDER BY created_at DESC
      `)
      .all()

    return res.json({
      success: true,
      count: cases.length,
      cases,
    })
  } catch (error) {
    console.error('Database error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve cases',
    })
  }
})

// ---------------------------------
// Start Server
// ---------------------------------

app.listen(PORT, () => {
  console.log(
    `🛡️ Cyber Triage API running on http://localhost:${PORT}`,
  )
})